import * as types from "../actions/actionTypes";

const initialState = {
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
