import Swal from "sweetalert2";

import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  CLEAN_DETAIL,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
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
        allDogs: action.payload
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
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_TEMPERAMENT:
      let copyDogs = state.allDogs;
      let dogsFiltered =
        action.payload === "all"
          ? copyDogs
          : copyDogs.filter((e) =>
              e.temperament.includes(action.payload)
            );
      if (dogsFiltered.length <= 0) {
        dogsFiltered = copyDogs;
        Swal.fire({
          title: "Oh, no!",
          text: "We did not find any dog ​​of the requested breed",
          icon: "warning",
          confirmButtonText: "OK!",
        });
      }
      return {
        ...state,
        dogs: dogsFiltered,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
