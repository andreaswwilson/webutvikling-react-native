import React from 'react';
import { View } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { Movie } from './../features/movies/MovieSlice';

interface Props {
  movie: Movie;
}
export const MovieCard: React.FC<Props> = ({ movie }): JSX.Element => {
  return (
    <Card>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: movie.Poster }} />
    </Card>
  );
};
