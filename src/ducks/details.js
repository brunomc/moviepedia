//types
const TYPES = {
  SET_MOVIE: 'SET_MOVIE',
};
//actions
export const setMovie = movie => {
  return {type: TYPES.SET_MOVIE, payload: movie};
};
//reducer
const INITIAL_STATE = {
  movie: {},
  error: '',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_MOVIE: {
      return {...state, movie: action.payload};
    }
    default: {
      return state;
    }
  }
};
