import axios from "axios";
import {
  LOAD_USER,
  REGISTER_USER,
  FAIL_USER,
  LOGIN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  GET_ALL_USERS,
  GET_USER,
} from "../constants/user";

export const register = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/api/user/register", user);
    //succees action
    dispatch({ type: REGISTER_USER, payload: result.data }); //{user,token,msg}
  } catch (error) {
    // fail
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const login = (user, navigation) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("http://localhost:4000/api/user/login", user);

    dispatch({ type: LOGIN_USER, payload: result.data }); //{msg,token,user}
    navigation.navigate(
      `${
        result.data.user.admin
          ? "Admin"
          : result.data.user.technicien
          ? "Manager"
          : result.data.user.transporter
          ? "Transporteur"
          : "User"
      }`
    );
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let result = await axios.get(
      "http://localhost:4000/api/user/current",
      config
    );
    dispatch({ type: CURRENT_USER, payload: result.data }); //{msg , user}
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

// logout
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const allUsers = await axios.get("api/user/");
    dispatch({ type: GET_ALL_USERS, payload: allUsers.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const getUserByID = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.get(`/api/user/${id}`);
    dispatch({ type: GET_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/user/${id}`);
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    await axios.put(`/api/user/${id}`, user);
    // dispatch(getUserByID(id));
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const videErrors = () => {
  return {
    type: "VIDE_ERRORS",
  };
};
