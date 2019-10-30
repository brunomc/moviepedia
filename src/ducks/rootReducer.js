import {combineReducers} from 'redux';
import Search from '../ducks/search';
import Details from '../ducks/details';
const rootReducer = combineReducers({
  Search: Search,
  Details: Details,
});

export default rootReducer;
