import httpService from "@helpers/httpService";
import componentsType from "./components.type";

export default {
  getDummyPost: () => {
    return async (dispatch) => {
      dispatch({ type: componentsType.LOADING });
      try {
        const res = await httpService.get("/posts");
        dispatch({ type: componentsType.POST, payload: res.data });
        return res.data;
      } catch (error) {
        dispatch({ type: componentsType.LOADING });
        return error;
      }
    };
  },
};
