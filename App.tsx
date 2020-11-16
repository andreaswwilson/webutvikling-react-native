import 'react-native-gesture-handler';
import React from 'react';
import { Navigator } from './client/navigator';
import { NavigationContainer } from '@react-navigation/native';
import { ThunkAction } from 'redux-thunk';
import movieSliceReducer, {
  MovieState,
} from './client/features/movies/MovieSlice';
import { configureStore, Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// The AppThunk type is used for type definitions for thunk actions
export type AppThunk = ThunkAction<void, MovieState, unknown, Action<string>>;

// Configure redux store
const store = configureStore({
  reducer: {
    movieStore: movieSliceReducer,
  },
});

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
