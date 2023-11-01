import * as types from "./actionTypes";
import weatherService from "../services/weatherService";

export const fetchCurrentWeather = (user_id, city, token) => async (
  dispatch
) => {
  const data = await weatherService.fetchCurrentWeather(user_id, city, token);
  return data;
};

export const fetchHistoricalWeather = (
  page,
  per_page,
  user_id,
  token
) => async (dispatch) => {
  const data = await weatherService.fetchHistoricalWeather(
    page,
    per_page,
    user_id,
    token
  );
  dispatch({ type: types.FETCH_HISTORICAL_WEATHER, data: data });
};

export const bulkDeleteWeatherHistory = (recordIds, token) => async (
  dispatch
) => {
  const data = await weatherService.bulkDeleteWeatherHistory(recordIds, token);
  return data;
};
