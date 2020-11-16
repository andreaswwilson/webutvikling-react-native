import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { Movie } from '../features/movies/MovieSlice';
import { useDispatch } from 'react-redux';
import { toggleFavorite, updateMovie } from '../features/movies/MovieSlice';

interface Props {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }): JSX.Element => {
  const dispatch = useDispatch();
  const toggle = (movie: Movie) => {
    dispatch(updateMovie({ ...movie, Favorite: !movie.Favorite }));
    dispatch(toggleFavorite(movie._id));
  };

  return (
    <Card>
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
        {movie.Favorite ? (
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
    </Card>
  );
};
