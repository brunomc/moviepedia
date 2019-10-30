import axios from 'axios';
import {env} from '../config/enviroment';
import {Actions} from 'react-native-router-flux';
export const setSearchInput = data => {
  return {type: 'SET_SEARCH_INPUT', payload: data};
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
    type: 'SET_GENRES',
    payload: genres,
  });
};
const loadGenresError = (error, dispatch) => {
  dispatch({
    type: 'GET_GENRES_ERROR',
    payload: 'Não foi possível retornar gêneros',
  });
};
const loadListMoviesSuccess = (list, category, dispatch) => {
  switch (category) {
    case 'now_playing': {
      dispatch({type: 'LIST_NOW_PLAYING', payload: list});
      break;
    }
    case 'top_rated': {
      dispatch({type: 'LIST_TOP_RATED', payload: list});
      break;
    }
    case 'popular': {
      dispatch({type: 'LIST_POPULAR', payload: list});
      break;
    }
    case 'upcoming': {
      dispatch({type: 'LIST_UPCOMING', payload: list});
      break;
    }
    default: {
      dispatch({
        type: 'GET_LIST_ERROR',
        payload: 'Não foi possível retornar todas as categorias',
      });
    }
  }
};
const loadListMoviesError = error => {
  dispatch({
    type: 'GET_LIST_ERROR',
    payload: 'Não foi possível retornar todas as categorias',
  });
};

export const search = data => {
  console.log('data', data);
  return dispatch => {
    axios
      .get(
        `${env().url}/search/movie?api_key=${
          env().api_key
        }&query=${data}&language=pt`,
      )
      .then(res => {
        searchSucces(res.data.results, dispatch);
      })
      .catch(res => {
        searchError(res, dispatch);
      });
  };
};
const searchSucces = (list, dispatch) => {
  dispatch({
    type: 'SEARCH',
    payload: list,
  });
};
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
    case 'SEARCH': {
      return {...state, movies: action.payload};
    }
    case 'SET_SEARCH_INPUT': {
      return {...state, searchInput: action.payload};
    }
    case 'SET_GENRES': {
      return {...state, genres: action.payload};
    }
    case 'LIST_NOW_PLAYING': {
      return {...state, moviesNowPlaying: action.payload};
    }
    case 'LIST_POPULAR': {
      return {...state, moviesPopular: action.payload};
    }
    case 'LIST_TOP_RATED': {
      return {...state, moviesTopRated: action.payload};
    }
    case 'LIST_UPCOMING': {
      return {...state, moviesUpComing: action.payload};
    }
    case 'GET_LIST_ERROR': {
      return {...state, error: action.payload};
    }
    default: {
      return state;
    }
  }
};
