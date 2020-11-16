import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../../App';
import { networkInterfaces } from 'os';

// Interace of one movie object
export interface Movie {
  _id: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: object[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Favorite?: boolean;
  Runtime: string;
  Reviews?: string[];
}
export interface FetchMoviesProps {
  id?: string;
  genre?: string[];
  sortYear?: string;
  title?: string;
  limit?: number;
  page?: number;
}

export interface MovieState {
  movies: Movie[];
  movie?: Movie;
  loading: boolean;
  totalCount: number;
  query: FetchMoviesProps;
  errors: string;
  page: number;
  limit: number;
  header: string;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  totalCount: 0,
  query: {},
  errors: '',
  page: 1,
  limit: 4,
  header: 'NTNU Movie DB',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },
    setMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      state.movies = payload;
    },
    setHeader: (state, { payload }: PayloadAction<string>) => {
      state.header = payload;
    },

    appendMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      payload.forEach((movie) => {
        if (state.movies.indexOf(movie) == -1) {
          state.movies.push(movie);
        }
      });
    },
    setTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.totalCount = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

// AppThunk sets the type definitions for the dispatch method
export const getMovies = (
  title: string = '',
  page: number = 1,
  append: boolean = false,
): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const baseURL =
        'http://it2810-32.idi.ntnu.no:3000/api/movies?title=' +
        title +
        '&page=' +
        page;
      console.log('Get request:', baseURL);
      await axios
        .get(baseURL)
        .then((res) => {
          if (append) {
            dispatch(appendMovies(res.data.data));
          } else {
            dispatch(setMovies(res.data.data));
          }
          dispatch(setLoading(false));
        })
        .catch((e) => {
          console.log('error in getMovies');
          console.log(e);
          dispatch(setLoading(false));
        });
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
    }
  };
};

export const {
  setLoading,
  setMovies,
  setTotalCount,
  appendMovies,
  setPage,
  setHeader,
} = movieSlice.actions;
export default movieSlice.reducer;
export const movieSelector = (state: { movieStore: MovieState }) =>
  state.movieStore;
