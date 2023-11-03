import * as types from "./actionTypes";
import authService from "../services/authService";

export const login = (username, password) => async (dispatch) => {
  const auth = await authService.login(username, password);
  dispatch({ type: types.LOGIN, data: auth });
  return auth;
};

export const register = (email, password, dob) => async (dispatch) => {
  const data = await authService.register(email, password, dob);
  return data;
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT, data: null });
  dispatch({ type: types.FETCH_CURRENT_WEATHER, data: null });
  dispatch({ type: types.FETCH_HISTORICAL_WEATHER, data: null });
};
