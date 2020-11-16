import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MovieParams, MovieScreen } from '../screens/MovieScreen';
import { useSelector } from 'react-redux';
import { movieSelector } from '../features/movies/MovieSlice';

export type StackParamList = {
  // Define which parameters can be passed to each of the screens of the navigator
  Home: undefined;
  Movie: MovieParams;
  // Movie: undefined;
};

export enum AppScreens {
  Home = 'Home',
  Movie = 'Movie',
}

const Stack = createStackNavigator<StackParamList>();

export const Navigator: React.FunctionComponent = () => {
  const { header } = useSelector(movieSelector);
  return (
    //   Hide the default header with the back button
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ title: 'NTNU Movie DB' }}
      />
      <Stack.Screen
        name={AppScreens.Movie}
        component={MovieScreen}
        options={{ title: header }}
      />
    </Stack.Navigator>
  );
};
