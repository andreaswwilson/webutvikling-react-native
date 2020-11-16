import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../navigator';
import {
  Movie,
  toggleFavorite,
  updateMovie,
} from '../features/movies/MovieSlice';
import { FlatList, View } from 'react-native';

import { Button, Card, Icon, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';

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
  // Because of the way i have set up with redux and passing of movies as props, i use this local state to
  // trigger the favorite icon to make sure that the icon rerenders when the favorite is toggled
  const [favorite, setFavorite] = useState<boolean>(movie.Favorite || false);
  const dispatch = useDispatch();
  const toggle = (movie: Movie) => {
    dispatch(updateMovie({ ...movie, Favorite: !movie.Favorite }));
    dispatch(toggleFavorite(movie._id));
    setFavorite(!favorite);
  };

  return (
    <Card containerStyle={{ borderWidth: 0 }}>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: movie.Poster }} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text>Rating: {movie.imdbRating} / 10</Text>
        {favorite ? (
          <Button
            type='clear'
            onPress={() => toggle(movie)}
            icon={<Icon name='heart' color='red' type='font-awesome' />}
          />
        ) : (
          <Button
            type='clear'
            onPress={() => toggle(movie)}
            icon={<Icon name='heart-o' color='black' type='font-awesome' />}
          />
        )}
      </View>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>Genre: {movie.Genre}</Text>
      <Text h4>Plot:</Text>
      <Text style={{ marginBottom: 10 }}>{movie.Plot}</Text>

      <Text h4>Review:</Text>
      <FlatList
        data={movie.Reviews}
        renderItem={({ item }) => {
          return (
            <Text style={{ marginBottom: 5, backgroundColor: 'lightgrey' }}>
              {item}
            </Text>
          );
        }}
      />
    </Card>
  );
};
