import typeToReducer from 'type-to-reducer';
import R from 'ramda';
import { FETCH_ALL_PROVIDERS } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_ALL_PROVIDERS]: {
    FULFILLED: (state, action) => {
      console.log(R.indexBy(R.prop('id'),action.payload));
      return {
        ...state,
        ...R.indexBy(R.prop('id'),action.payload)
      }
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }
}, {});
