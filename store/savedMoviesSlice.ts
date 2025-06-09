// store/savedMoviesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
 
}

interface SavedMoviesState {
  movies: Movie[];
}

const initialState: SavedMoviesState = {
  movies: [],
};

const savedMoviesSlice = createSlice({
  name: 'savedMovies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.find(m => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { addMovie, removeMovie, clearMovies } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;
