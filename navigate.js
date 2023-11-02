
import Main from './Pages/Main/page'
import Create from './Pages/Create/page'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate () {

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={ Main }
        options={ { headerShown: false, animationEnabled: false } }
        initialParams={[]}
      />
      <Stack.Screen
        name="Create"
        component={ Create }
        options={ { headerShown: false, animationEnabled: false } }
        initialParams={[]}
      />
    </Stack.Navigator>
  </NavigationContainer>

}
