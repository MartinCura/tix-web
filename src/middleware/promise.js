import {
  UNAUTHORIZED,
} from 'store/domain/account/actions';
import R from 'ramda';

function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}

function mapResponseToPayload(res, body) {
  return {
    ...body,
    status: parseInt(res.status, 10),
  };
}

export default function promiseMiddleware(store) {
  return next => action => {
    const { payload, type, ...rest } = action;
    const state = store.getState();

    // if payload doesn't exist, move along
    if (!payload) { return next(action); }

    const token = R.path(['account', 'user', 'token'], state);


    // payload can be either a function or a promise.
    // if its a function, let's execute that, before checking
    // whether its a promise
    const payloadResult = (typeof payload === 'function') ? payload(token) : payload;
    // if the resulting payload is not a promise, move along.
    if (!isPromise(payloadResult)) { console.log(";is not promise"); return next(action); }

    // it is a promise, so we handle it.
    const SUCCESS = `${type}_FULFILLED`;
    const PENDING = `${type}_PENDING`;
    const FAILURE = `${type}_REJECTED`;
    next({ ...rest, type: PENDING });

    function checkStatus(res) {
      return res
    }

    function handleFailure(res) {
      return res.json().then((body) => {
        next({
          ...rest,
          payload: body,
          status: res.status,
          type: FAILURE,
        });

        if (res.status !== 200) {
          store.dispatch({type: UNAUTHORIZED});
        }

        throw mapResponseToPayload(res, body);
      });
    }

    function handleSuccess(res) {
      return res.json().then((body) => {

        next({
          ...rest,
          payload: body,
          status: res.status,
          type: SUCCESS,
        });

        return mapResponseToPayload(res, body);
      });
    }

    return payloadResult
      .then(handleSuccess, handleFailure);
  };
}