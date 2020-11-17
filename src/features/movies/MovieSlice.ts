import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../../App';

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

    addReview: (
      state,
      { payload }: PayloadAction<{ movie: Movie; review: string }>,
    ) => {
      const { movie, review } = payload;
      state.movies.map((m: Movie) => {
        if (m._id === movie._id) {
          if (m.Reviews) {
            m.Reviews.push(review);
          } else {
            m.Reviews = [review];
          }
          console.log(m.Reviews);
        }
      });
    },

    appendMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      const existingIds = [...state.movies.map((m) => m._id)];
      payload.forEach((movie) => {
        if (!existingIds.includes(movie._id)) {
          state.movies.push(movie);
          existingIds.push(movie._id);
        }
      });
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    toggleFavorite: (state, { payload }: PayloadAction<string>) => {
      state.movies.map((movie: Movie) => {
        // Switch the favorite boolean of the movie
        if (movie._id === payload) {
          movie.Favorite = !movie.Favorite;
        }
        return movie;
      });
    },
  },
});

// AppThunk sets the type definitions for the dispatch method
export const getMovies = (
  title: string = '',
  genre: string[] = [''],
  page: number = 1,
  sort: string = '',
  append: boolean = false,
): AppThunk => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      let baseURL =
        'http://it2810-32.idi.ntnu.no:3000/api/movies?title=' +
        title +
        '&page=' +
        page +
        '&sortByYear=' +
        sort;
      genre.forEach((g) => {
        if (g.length > 0) {
          baseURL += '&genre[]=' + g;
        }
      });
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

// Update a movie
export const updateMovie = (movie: Movie): AppThunk => {
  const url = 'http://it2810-32.idi.ntnu.no:3000/api/movies/' + movie._id;

  return async () => {
    axios
      .put(url, movie)
      .then((res) => {
        console.log('Updated movie result: ', res);
      })
      .catch((e) => {
        console.log('error trying to update movie: ', e);
      });
  };
};

export const {
  setLoading,
  setMovies,
  appendMovies,
  setPage,
  setHeader,
  toggleFavorite,
  addReview,
} = movieSlice.actions;
export default movieSlice.reducer;
export const movieSelector = (state: { movieStore: MovieState }) =>
  state.movieStore;
