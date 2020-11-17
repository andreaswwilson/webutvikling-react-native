import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../navigator';
import {
  Movie,
  toggleFavorite,
  updateMovie,
  addReview,
  movieSelector,
} from '../features/movies/MovieSlice';
import { FlatList, View } from 'react-native';

import { Button, Card, Icon, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

type MovieScreenNavigationProps = StackNavigationProp<
  StackParamList,
  AppScreens.Movie
>;
export type MovieParams = {
  id: string;
};
interface MovieScreenProps {
  route: { params: MovieParams };
  navigation: MovieScreenNavigationProps;
}
export const MovieScreen: React.FunctionComponent<MovieScreenProps> = (
  props,
): JSX.Element => {
  const { id } = props.route.params;
  // Because of the way i have set up with redux and passing of movies as props, i use this local state to
  // trigger the favorite icon to make sure that the icon rerenders when the favorite is toggled
  const { movies } = useSelector(movieSelector);
  const movie = movies.find((e) => e._id === id) as Movie;
  const dispatch = useDispatch();

  // Toggle favorite
  const toggle = (movie: Movie) => {
    dispatch(toggleFavorite(movie._id));
  };

  // Save movie to DB on changes
  useEffect(() => {
    dispatch(updateMovie(movie));
  }, [movie]);
  // Local state to keep track of userinput in review input field
  const [review, setReview] = useState<string>('');

  return (
    <Card containerStyle={{ borderWidth: 0 }}>
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
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>Genre: {movie.Genre}</Text>
      <Text h4>Plot:</Text>
      <Text style={{ marginBottom: 10 }}>{movie.Plot}</Text>

      <Text h4>Add Review:</Text>
      <Input
        placeholder='Review'
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={(input) => setReview(input)}
        value={review}
        onSubmitEditing={() => {
          if (review.length > 0) {
            // Add review to movie
            dispatch(addReview({ movie, review }));
            // Clear input
            setReview('');
          }
        }}
      />

      <Text h4 style={{ marginTop: 10 }}>
        Reviews:
      </Text>
      {movie.Reviews && movie.Reviews.length > 0 ? (
        <FlatList
          data={movie.Reviews}
          keyExtractor={(review: string) => review}
          renderItem={({ item }) => {
            return (
              <Text style={{ marginBottom: 5, backgroundColor: 'lightgrey' }}>
                {item}
              </Text>
            );
          }}
        />
      ) : (
        <Text>No reviews yet.</Text>
      )}
    </Card>
  );
};
