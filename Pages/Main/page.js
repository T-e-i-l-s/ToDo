import { StatusBar } from 'expo-status-bar';
import { Animated, Text, View, FlatList, Image } from 'react-native';
import styles from './styles'
import React, { useState, useRef } from 'react';
import { TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from 'react-native';


export default function App({ navigation, route }) {

  const [list,setList] = useState([])

  const [reload,setReload] = useState(0)

  const [group,setGroup] = useState('Все')
  const [groupCol,setGroupCol] = useState(['#f09f48','#fff'])

  const Opacity = useRef(
    new Animated.Value(1)
  ).current
  const translateX = useRef(
    new Animated.Value(0)
  ).current

  async function loadData () {
    const arr = await AsyncStorage.getItem('ToDo');
    let res = JSON.parse(arr)
    if (res != null) {
      await setList(res)
    }
    setReload(reload+1)
  }

  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      setGroup('Все')
      setGroupCol(['#f09f48','#fff'])
      setList([])
      loadData()
      
      Animated.timing(translateX,{
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()

    });

    return focusHandler;

  }, [navigation]);


  const getColor = (e) => {

    if (e) {
      return '#473b3b'
    } else {
      return '#242424'
    }

  }


  const changeGroup = async (e) => {
    
    Animated.timing(Opacity,{
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()

    if (e == 'Все') {
      setGroupCol(['#f09f48','#fff'])
    } else {
      setGroupCol(['#fff','#f09f48'])
    }

    setTimeout(async () => {

      if (e == 'Все') {
        setGroup('Все')
      } else {
        setGroup('Важные')
      }

      setReload(reload+1)

      Animated.timing(Opacity,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()

    },500)
  }


  return (

    <View style={{flex:1, backgroundColor: '#171717'}}>

      <ScrollView contentContainerStyle={{width: '100%'}}>

        <Animated.View style={[styles.droidSafeArea, {transform:[{translateX: translateX}]}]}>

          <StatusBar style="auto" />


          <View style={styles.header}>

            <Text style={styles.pageTitle}>Список дел</Text>

            <TouchableHighlight 
            underlayColor={'rgba(255, 0, 255,0)'} 
            style={{width: '10%', alignItems: 'flex-end'}}
            onPress={() => {
              Animated.timing(translateX,{
                toValue: -500,
                duration: 500,
                useNativeDriver: true
              }).start()
              setTimeout(() => {
                navigation.navigate('Create', {'array': list, 'edit':-1})
              },500)
            }}>
              <Image source={require('../../assets/icons/add.png')} style={styles.addIcon}/>
            </TouchableHighlight>

          </View>


          <View style={[styles.row,{marginBottom:10}]}>

            <Text 
            style={[styles.group, {backgroundColor: groupCol[1], color: groupCol[0]}]} 
            onPress={() => changeGroup('Все')}>
              Все
            </Text>

            <Text 
            style={[styles.group, {backgroundColor: groupCol[0], color: groupCol[1]}]} 
            onPress={() => changeGroup('Важные')}>
              Важные
            </Text>
          
          </View>

          <Animated.View style={{width: '90%',opacity: Opacity}}>

            <FlatList 
            extraData={reload}
            data={list}
            renderItem={({item, index}) => {

              if ( group == 'Все' || item.isImportant  ) {
                return(
                  <View style={[styles.block, {backgroundColor: getColor(item.isImportant)}]}>

                    <BouncyCheckbox isChecked={item.did} onPress={(isChecked) => {
                      let arr = list
                      arr[index].did = isChecked
                      setList(arr)
                      AsyncStorage.setItem('ToDo', JSON.stringify(list));
                      setReload(reload+1)
                    }} />
              
                    <View style={{width: '62%'}}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
              
                    <TouchableHighlight 
                    underlayColor={'rgba(255, 0, 255,0)'} 
                    style={styles.buttons}
                    onPress={() => {
                      navigation.navigate('Create', {'array': list, 'edit':index})
                    }}>
                      <Image source={require('../../assets/icons/edit.png')} style={styles.deleteIcon}/>
                    </TouchableHighlight>
              
                    <TouchableHighlight 
                    underlayColor={'rgba(255, 0, 255,0)'} 
                    style={styles.buttons}
                    onPress={() => {
                      Animated.timing(Opacity,{
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                      }).start()
                      setTimeout(() => {
                        list.splice(index,1)
                        AsyncStorage.setItem('ToDo', JSON.stringify(list));
                        setList([])
                        loadData()
                        setReload(reload+1)
                        Animated.timing(Opacity,{
                          toValue: 1,
                          duration: 300,
                          useNativeDriver: true
                        }).start()
                      },500)
                    }}>
                      <Image source={require('../../assets/icons/delete.png')} style={styles.deleteIcon}/>
                    </TouchableHighlight>
              
                  </View>
                )
              }
            }}/>

          </Animated.View>
            

        </Animated.View>

      </ScrollView>
    </View>

  );
}
