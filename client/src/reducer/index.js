import Swal from "sweetalert2";

import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  CLEAN_DETAIL,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
  ORDER_DOGS,
  CLEAN_DOGS,
  CREATE_DOG,
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
        allDogs: action.payload,
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
          : copyDogs.filter((e) => e.temperament.includes(action.payload));
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
    case ORDER_DOGS:
      let orderDogs;

      if (action.payload === "all") {
        orderDogs = state.dogs;
      } else if (action.payload === "asc") {
        orderDogs = state.dogs.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      } else if (action.payload === "desc") {
        orderDogs = state.dogs.sort((a, b) => {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        });
      } else if (action.payload === "weightMin") {
        orderDogs = state.dogs.sort(
          (a, b) => parseInt(a.weight_min) - parseInt(b.weight_min)
        );
      } else if (action.payload === "weightMax") {
        orderDogs = state.dogs.sort(
          (a, b) => parseInt(b.weight_min) - parseInt(a.weight_min)
        );
      } else if (action.payload === "heightMin") {
        orderDogs = state.dogs.sort(
          (a, b) => parseInt(a.height_min) - parseInt(b.height_min)
        );
      } else if (action.payload === "heightMax") {
        orderDogs = state.dogs.sort(
          (a, b) => parseInt(b.height_max) - parseInt(a.height_max)
        );
      }

      return {
        ...state,
        dogs: orderDogs,
      };
    case CLEAN_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case CREATE_DOG:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
