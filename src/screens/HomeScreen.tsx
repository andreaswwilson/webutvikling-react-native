import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import { AppScreens, StackParamList } from '../navigator';
import {
  Button,
  CheckBox,
  Icon,
  Overlay,
  SearchBar,
  Text,
} from 'react-native-elements';
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

  // toggeling of filter Overlay
  const [visible, setVisible] = useState(false);

  // Keep track of filter state
  const [checkBoxFilter, setCheckBoxFilter] = useState<string[]>([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getMovies(searchQuery, checkBoxFilter, page));
  }, [searchQuery]);

  const updateFilter = (genre: string) => {
    if (checkBoxFilter.includes(genre)) {
      setCheckBoxFilter(checkBoxFilter.filter((e) => e !== genre));
    } else {
      setCheckBoxFilter([...checkBoxFilter, genre]);
    }
  };
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
      <Button
        type='outline'
        style={{ backgroundColor: 'white' }}
        icon={<Icon name='filter' color='black' type='font-awesome' />}
        onPress={toggleOverlay}
      />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.8,
          }}
        >
          <Text h4 style={{ textAlign: 'center' }}>
            Category
          </Text>
          <CheckBox
            title='Action'
            checked={checkBoxFilter.includes('action')}
            onPress={() => {
              updateFilter('action');
            }}
          />
          <CheckBox
            title='Drama'
            checked={checkBoxFilter.includes('drama')}
            onPress={() => {
              updateFilter('drama');
            }}
          />
          <CheckBox
            title='Comedy'
            checked={checkBoxFilter.includes('comedy')}
            onPress={() => {
              updateFilter('comedy');
            }}
          />

          <Button
            title='Apply filter'
            onPress={() => {
              toggleOverlay();
              dispatch(setPage(1));
              dispatch(getMovies(searchQuery, checkBoxFilter, 1));
            }}
          />
        </View>
      </Overlay>

      <FlatList
        data={movies}
        keyExtractor={(movie: Movie) => movie._id}
        //
        onRefresh={() => {
          // Reset and load movies again if user pull the list all the way up
          dispatch(setPage(1));
          setSearchQuery('');
          setCheckBoxFilter([]);
          dispatch(getMovies('', checkBoxFilter, 1));
        }}
        refreshing={false}
        // Get more data from backend when scrolling down
        onEndReachedThreshold={0.4} // run onEndReach when reaching bottom
        onEndReached={() => {
          // Add more movies to state when on bottom
          dispatch(getMovies(searchQuery, checkBoxFilter, page + 1, true));
          // Increase page for next api query
          dispatch(setPage(page + 1));
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                navigation.navigate(AppScreens.Movie, { id: item._id });
                dispatch(setHeader(item.Title));
              }}
            >
              <MovieCard movie={item} />
            </TouchableOpacity>
          );
        }}
      />
      {loading && <ActivityIndicator size='large' />}
      {!loading && movies.length == 0 && (
        <Text h4 style={{ textAlign: 'center', marginTop: 60 }}>
          No results
        </Text>
      )}
    </View>
  );
};
