const INITIAL_STATE = {
  movie: {},
  error: '',
};
export const setMovie = movie => {
  return {type: 'SET_MOVIE', payload: movie};
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_MOVIE': {
      return {...state, movie: action.payload};
    }
    default: {
      return state;
    }
  }
};
