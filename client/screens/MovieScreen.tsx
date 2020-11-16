import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../navigator';
import { Movie } from '../features/movies/MovieSlice';
import { Text } from 'react-native';
type MovieScreenNavigationProps = StackNavigationProp<
  StackParamList,
  AppScreens.Movie
>;
export type MovieParams = {
  movie: Movie;
};
interface MovieScreenProps {
  route: { params: MovieParams };
  navigation: MovieScreenNavigationProps;
}
export const MovieScreen: React.FunctionComponent<MovieScreenProps> = (
  props,
): JSX.Element => {
  const { movie } = props.route.params;

  return <Text>Hi</Text>;
};
