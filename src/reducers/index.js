import { combineReducers } from "redux";
import { FETCH_DATA, FETCH_DATA_LOGIN, FETCH_PROFILE } from "../actions/index";

export const data = (
  state = {
    items: ""
  },
  action
) => {
  switch (action.type) {
    case `${FETCH_DATA}`:
      return {
        ...state,
        items: "This is data from redux"
      };

    default:
      return state;
  }
};

export const dataLogin = (state = { dataLogin: {} }, action) => {
  switch (action.type) {
    case `${FETCH_DATA_LOGIN}`:
      return {
        ...state,
        dataLogin: action.payload
      };

    default:
      return state;
  }
};

export const dataProfile = (state = { dataProfile: {} }, action) => {
  switch (action.type) {
    case `${FETCH_PROFILE}`:
      return {
        ...state,
        dataProfile: action.payload
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataLogin: dataLogin,
  dataProfile: dataProfile
});

export default rootReducer;
