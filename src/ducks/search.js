import axios from 'axios';
import {env} from '../config/enviroment';
//types
const TYPES = {
  SEARCH: 'SEARCH',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_GENRES: 'SET_GENRES',
  GET_GENRES_ERROR: 'GET_GENRES_ERROR',
  LIST_NOW_PLAYING: 'LIST_NOW_PLAYING',
  LIST_TOP_RATED: 'LIST_TOP_RATED',
  LIST_POPULAR: 'LIST_POPULAR',
  LIST_UPCOMING: 'LIST_UPCOMING',
  GET_LIST_ERROR: 'GET_LIST_ERROR',
};
//actions
export const setSearchInput = data => {
  return {type: TYPES.SET_SEARCH_INPUT, payload: data};
};
export const loadListMovies = category => {
  return dispatch => {
    axios
      .get(
        `${env().url}/movie/${category}?api_key=${env().api_key}&language=en`,
      )
      .then(res => {
        loadListMoviesSuccess(res.data.results, category, dispatch);
      })
      .catch(res => {
        loadListMoviesError(res, dispatch);
      });
  };
};
export const loadGenres = ids => {
  return dispatch => {
    axios
      .get(`${env().url}/genre/movie/list?api_key=${env().api_key}&language=pt`)
      .then(res => {
        loadGenresSuccess(res.data.genres, ids, dispatch);
      })
      .catch(res => {
        loadGenresError(res, dispatch);
      });
  };
};
const loadGenresSuccess = (list, ids, dispatch) => {
  let genres = '';
  list.map(genre => {
    ids.map(id => {
      if (id == genre.id) {
        genres = genres + ' -' + genre.name;
      }
    });
  });
  dispatch({
    type: TYPES.SET_GENRES,
    payload: genres,
  });
};
const loadGenresError = (error, dispatch) => {
  dispatch({
    type: TYPES.GET_GENRES_ERROR,
    payload: 'Não foi possível retornar gêneros',
  });
};
const loadListMoviesSuccess = (list, category, dispatch) => {
  switch (category) {
    case 'now_playing': {
      dispatch({type: TYPES.LIST_NOW_PLAYING, payload: list});
      break;
    }
    case 'top_rated': {
      dispatch({type: TYPES.LIST_TOP_RATED, payload: list});
      break;
    }
    case 'popular': {
      dispatch({type: TYPES.LIST_POPULAR, payload: list});
      break;
    }
    case 'upcoming': {
      dispatch({type: TYPES.LIST_UPCOMING, payload: list});
      break;
    }
    default: {
      dispatch({
        type: TYPES.GET_LIST_ERROR,
        payload: 'Não foi possível retornar todas as categorias',
      });
    }
  }
};
const loadListMoviesError = error => {
  dispatch({
    type: TYPES.GET_LIST_ERROR,
    payload: 'Não foi possível retornar todas as categorias',
  });
};

export const search = data => {
  return dispatch => {
    axios
      .get(
        `${env().url}/search/movie?api_key=${
          env().api_key
        }&query=${data}&language=pt`,
      )
      .then(res => {
        searchSuccess(res.data.results, dispatch);
      })
      .catch(res => {
        searchError(res, dispatch);
      });
  };
};
const searchSuccess = (list, dispatch) => {
  dispatch({
    type: TYPES.SEARCH,
    payload: list,
  });
};
//reducer
const INITIAL_STATE = {
  movies: [],
  movie: {},
  genres: [],
  searchInput: '',
  moviesNowPlaying: [],
  moviesTopRated: [],
  moviesPopular: [],
  moviesUpComing: [],
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SEARCH: {
      return {...state, movies: action.payload};
    }
    case TYPES.SET_SEARCH_INPUT: {
      return {...state, searchInput: action.payload};
    }
    case TYPES.SET_GENRES: {
      return {...state, genres: action.payload};
    }
    case TYPES.LIST_NOW_PLAYING: {
      return {...state, moviesNowPlaying: action.payload};
    }
    case TYPES.LIST_POPULAR: {
      return {...state, moviesPopular: action.payload};
    }
    case TYPES.LIST_TOP_RATED: {
      return {...state, moviesTopRated: action.payload};
    }
    case TYPES.LIST_UPCOMING: {
      return {...state, moviesUpComing: action.payload};
    }
    case TYPES.GET_LIST_ERROR: {
      return {...state, error: action.payload};
    }
    default: {
      return state;
    }
  }
};
