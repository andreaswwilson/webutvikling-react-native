import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AppScreens, StackParamList } from '../navigator';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMovies,
  setPage,
  Movie,
  movieSelector,
  setHeader,
} from '../features/movies/MovieSlice';
import { TouchableOpacity } from 'react-native';
import { MovieCard } from '../components/MovieCard';

type HomeScreenNavigationProps = StackNavigationProp<StackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = (
  props,
): JSX.Element => {
  const { navigation } = props;
  // Using local state for updating setSearchQuery
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  const { movies, loading, page } = useSelector(movieSelector);

  useEffect(() => {
    dispatch(getMovies(searchQuery, page));
  }, [searchQuery]);

  return (
    <View>
      {/* Adding SearchBar. Platform = android just sets the styling.
      Using hooks to keep track of the input */}
      <SearchBar
        placeholder='Search'
        platform='android'
        value={searchQuery}
        onChangeText={(input) => {
          setSearchQuery(input);
          dispatch(setPage(1));
        }}
      />

      <FlatList
        data={movies}
        keyExtractor={(movie: Movie) => movie._id}
        //
        onRefresh={() => {
          // Reset and load movies again if user pull the list all the way up
          dispatch(setPage(1));
          setSearchQuery('');
          dispatch(getMovies('', 1));
        }}
        refreshing={false}
        // Get more data from backend when scrolling down
        onEndReachedThreshold={0.4} // run onEndReach when reaching bottom
        onEndReached={() => {
          // Add more movies to state when on bottom
          dispatch(getMovies(searchQuery, page + 1, true));
          // Increase page for next api query
          dispatch(setPage(page + 1));
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                navigation.navigate(AppScreens.Movie, { movie: item });
                dispatch(setHeader(item.Title));
              }}
            >
              <MovieCard movie={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
