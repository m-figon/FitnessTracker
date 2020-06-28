import {FETCH_POSTS, NEW_POST} from './type';

  export const loginAction = (value) => dispatch => {
        dispatch({
          type: FETCH_POSTS,
         payload: value
        })
  };