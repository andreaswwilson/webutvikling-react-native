import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/HomeScreen';
export type StackParamList = {
  // Define which parameters can be passed to each of the screens of the navigator
  Home: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export const Navigator: React.FunctionComponent = () => {
  return (
    //   Hide the default header with the back button
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ title: 'NTNU Movie DB' }}
      />
    </Stack.Navigator>
  );
};
