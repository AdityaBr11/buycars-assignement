import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    
  } from "./actionType";
  import axios from "axios";
  import Cookies from "universal-cookie";
  
  
  const cookie = new Cookies();

  export const signupUser = (payload) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const { data } = await axios.post(`http://localhost:8080/reg/new`, payload);
    //   console.log(data, "login data");
      dispatch({ type: SIGNUP_SUCCESS, payload: data.msg });
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error.response.data.msg });
    }
  };


  export const loginUser = (payload) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post(`http://localhost:8080/reg/login`, payload);
      console.log(data, "login data");
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.msg });
      let token = data.token;
      cookie.set("token", token);
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };
  
  export const loadUser = () => async (dispatch) => {
      try {
        dispatch({ type: LOAD_USER_REQUEST });
    
        const { data } = await axios.get(`http://localhost:8080/reg/me`, {
          headers: {
            authorization: cookie.get("token"),
          },
        });
    
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
      } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
      }
    };