import {combineReducers} from 'redux';
import postReducer from './acReducer';
import acReducer from './acReducer';

export default combineReducers({
    posts: acReducer
})