import { useCallback } from 'react'
import Page from './navigate'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync() // Раскрываем splash screen для загрузки шрифтов

let flag = false

export default function App() {
  // Загружаем шрифты
  const [fontsLoaded] = useFonts({
    'font': require('./assets/Comfortaa.ttf'),
  });

  if ( !flag ) {
    // Проверяем нужно ли убрать splash screen
    let ind = setInterval(() => {
      if (fontsLoaded) {
        clearInterval(ind);
        SplashScreen.hideAsync();
      }
    },100)
    flag = true
  }

  if (!fontsLoaded) { // Если шрифт не загружен => возвращаем null
    return null;
  }

  // Рендерим приложение
  return (
    <Page/>
  );
}
