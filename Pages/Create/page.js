import { StatusBar } from 'expo-status-bar';
import { Animated, Text, View, SafeAreaView, Image, TouchableHighlight, TextInput, Switch } from 'react-native';
import styles from './styles'
import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function App({ navigation, route }) {

  const param = route.params
  const [list,setList] = useState(param['array'])
  const edit = param['edit']
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [isImportant,setImportant] = useState(false)

  const Opacity = useRef(
    new Animated.Value(0)
  ).current

  const save = async () => {
    Animated.timing(Opacity,{
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
    setTimeout(async () => {  
      if ( edit == -1 ) {
        if ( list == null ) {
          setList([{'title': title, 'description': description, 'isImportant': isImportant, 'did': false}])
        } else {
          await list.unshift({'title': title, 'description': description, 'isImportant': isImportant, 'did': false})
        }
      } else {
        list[edit].title = title
        list[edit].description = description
        list[edit].isImportant = isImportant
      }
      await AsyncStorage.setItem('ToDo', JSON.stringify(list));
      navigation.navigate('Main')
    },500)
  }


  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      if ( edit != -1 ) {
        setTitle(list[edit].title)
        setDescription(list[edit].description)
        setImportant(list[edit].isImportant)
      }
      Animated.timing(Opacity,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()

    });

    return focusHandler;

  }, [navigation]);


  return (

    <View style={{flex:1, backgroundColor: '#171717'}}>

      <Animated.View style={[styles.droidSafeArea,{opacity: Opacity}]}>

        <StatusBar style="auto" />

        <View style={styles.header}>

          <TouchableHighlight 
          underlayColor={'rgba(255, 0, 255,0)'} 
          style={{width: '10%', alignItems: 'flex-start'}}
          onPress={() => {
            Animated.timing(Opacity,{
              toValue: 0,
              duration: 500,
              useNativeDriver: true
            }).start()
            setTimeout(async () => { 
              navigation.navigate('Main')
            },500)
          }}>
            <Image source={require('../../assets/icons/back.png')} style={styles.backIcon}/>
          </TouchableHighlight>

          <Text style={styles.pageTitle}>Новое задание</Text>

        </View>

        <Text style={styles.inputTitle}>Название</Text>
        <TextInput 
        multiline={true}
        style={styles.input}
        placeholder=''
        placeholderTextColor={'#fff'}
        cursorColor={'#9e9e9e'}
        onChangeText={(e) => setTitle(e)}
        defaultValue={title}/>

        <Text style={styles.inputTitle}>Описание</Text>
        <TextInput 
        multiline={true}
        style={styles.input}
        placeholder=''
        placeholderTextColor={'#fff'}
        cursorColor={'#9e9e9e'}
        onChangeText={(e) => setDescription(e)}
        defaultValue={description}/>
        
        <View style={styles.row}>
          <Switch
          trackColor={{ false: "#767577", true: "#5e3434" }}
          thumbColor={isImportant ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={() => setImportant(!isImportant)}
          value={isImportant}
          />
          <Text style={styles.rowTitle}>Важно</Text>
        </View>

        <Text style={styles.button} onPress={() => save()}>Добавить</Text>

      </Animated.View>

    </View>

  );
}
