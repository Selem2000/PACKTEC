import axios from "axios";
import { FAILD_POST, GET_ALL_POSTS, LOAD_POST } from "../constants/post";

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    const result = await axios.get("http://localhost:4000/api/post/");
    dispatch({ type: GET_ALL_POSTS, payload: result.data });
    console.log(result);
  } catch (error) {
    dispatch({ type: FAILD_POST, payload: error.response.data.errors });
    console.log(error);
  }
};
