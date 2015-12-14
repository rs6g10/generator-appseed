import { combineReducers } from 'redux';
import { cards } from './card-reducer';

const appReducer = combineReducers({
  cards
});

export default appReducer;
