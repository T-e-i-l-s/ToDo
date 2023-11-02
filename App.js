import { useCallback } from 'react';
import Page from './navigate'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let flag = false
export default function App() {

  const [fontsLoaded] = useFonts({
    'font': require('./assets/Comfortaa.ttf'),
  });

  if ( !flag ) {
    let ind = setInterval(() => {
      if (fontsLoaded) {
        clearInterval(ind);
        SplashScreen.hideAsync();
      }
    },100)
    fleg = true
  }


  if (!fontsLoaded) {
    return null;
  }

  return (
    <Page/>
  );
}
