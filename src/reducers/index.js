import { combineReducers } from "redux";
import authReducer from "./authReducer";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
});

export default rootReducer;
