import axios from "axios";
import { GET_DOGS } from "./utilities";

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
