export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `REWARDS_${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const createReducer =
  (TypeFunc, initialState) =>
  (state = initialState, _action = {}) => {
    switch (_action.type) {
      case TypeFunc.REQUEST:
        return { ...state, fetching: true, error: null };
      case TypeFunc.SUCCESS:
        return { ...state, fetching: false, data: _action.payload };
      case TypeFunc.FAILURE:
        return { ...state, fetching: false, data: [], error: _action.error };
      default:
        return state;
    }
  };

export const createReducerShort = (initialState, handlers) =>
  function reducer(state = initialState, _action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, _action.type)) {
      return handlers[_action.type](state, _action);
    }
    return state;
  };
