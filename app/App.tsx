import React from 'react';
import {CookingStackScreen} from './Cooking';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {LibraryStackScreen} from './Library';
import {useColorScheme} from 'react-native';
import {useBackgroundColor} from './View';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            {
              borderTopColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
            useBackgroundColor(),
          ],
        }}>
        <Tab.Screen name="Cooking" component={CookingStackScreen} />
        <Tab.Screen name="Library" component={LibraryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
