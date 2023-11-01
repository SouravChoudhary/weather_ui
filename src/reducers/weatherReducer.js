import * as types from "../actions/actionTypes";

const initialState = {
  currentWeather: {},
  historicalWeather: {},
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.data,
      };

    case types.FETCH_HISTORICAL_WEATHER:
      return {
        ...state,
        historicalWeather: action.data,
        error: null,
      };
    default:
      return state;
  }
};

export default weatherReducer;
