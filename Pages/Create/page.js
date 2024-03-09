import { StatusBar } from 'expo-status-bar'
import { Animated, Text, View, SafeAreaView, Image, TouchableHighlight, TextInput, Switch } from 'react-native'
import styles from './styles'
import React, { useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function App({ navigation, route }) {
  const param = route.params // Параметры, переданные при навигации

  const [list,setList] = useState(param['array']) // Список всех todo
  const edit = param['edit'] // Открыта ли страница для редактировалия

  const [title,setTitle] = useState('') // Название todo
  const [description,setDescription] = useState('') // Описание todo
  const [isImportant,setImportant] = useState(false) // Помечать ли как важное

  // Видимость страницы
  const Opacity = useRef(
    new Animated.Value(0)
  ).current

  // Функция создания/редактирования todo
  const save = async () => {
    // Делаем страницу прозрачной
    Animated.timing(Opacity,{
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()

    setTimeout(async () => {  
      if ( edit == -1 ) { // Если режим создания => добавляем новый элемент
        if ( list == null ) {
          setList([{'title': title, 'description': description, 'isImportant': isImportant, 'did': false}])
        } else {
          await list.unshift({'title': title, 'description': description, 'isImportant': isImportant, 'did': false})
        }
      } else { // Если режим редактирования => сохраняем изменения
        list[edit].title = title
        list[edit].description = description
        list[edit].isImportant = isImportant
      }
      // Сохраняем изменения в local storage
      await AsyncStorage.setItem('ToDo', JSON.stringify(list))
      // Переходим на главный экран
      navigation.navigate('Main')
    },500)
  }

   // Хук загрузки данных при переходе на страницу
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', async () => {
      if ( edit != -1 ) { // Если режим редактирования => Заполняем textInput
        setTitle(list[edit].title)
        setDescription(list[edit].description)
        setImportant(list[edit].isImportant)
      }
      // Плавно открываем страницу
      Animated.timing(Opacity,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    });
    return focusHandler
  }, [navigation])

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
  )
}
