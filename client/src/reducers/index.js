import { combineReducers } from 'redux';
import books from './books';
import user from './user';

const rootReducers = combineReducers({ books, user });

export default rootReducers;
