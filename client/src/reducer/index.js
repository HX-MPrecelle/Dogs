import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  CLEAN_DETAIL,
} from "../actions/utilities";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  dogDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
