import axios from "axios";
import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  CLEAN_DETAIL,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
  ORDER_DOGS,
  CLEAN_DOGS,
} from "./utilities";

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      let url = "http://localhost:8080/temperaments";
      let json = await axios.get(url);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDogs = () => {
  return async (dispatch) => {
    try {
      let url = "http://localhost:8080/dogs";
      let json = await axios.get(url);
      return dispatch({
        type: GET_DOGS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      let url = `http://localhost:8080/dogs?name=${name}`;
      let json = await axios.get(url);
      return dispatch({
        type: GET_DOG_NAME,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDogById = (id) => {
  return async (dispatch) => {
    try {
      let url = `http://localhost:8080/dogs/${id}`;
      let json = await axios.get(url);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const cleanDogDetail = (dispatch) => {
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  });
};

export const filterTemperament = (temperament) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
};

export const orderDogs = (order) => {
  return {
    type: ORDER_DOGS,
    payload: order,
  };
};

export const cleanDogs = () => {
  return {
    type: CLEAN_DOGS,
    payload: [],
  };
};
