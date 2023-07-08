import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER,
    SIGNUP_REQUEST,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
  } from "./actionType";
  
  import Cookies from "universal-cookie";
  
  const cookie = new Cookies();
  
  export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
      case LOGIN_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
          signup:false,
        };
      case LOAD_USER_REQUEST:
        return {
          isloading: true,
          isAuthenticated: false,
        };
      case LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isloading:false,
          isAuthenticated: true,
          login: true,
          crediantial: true,
          user: action.payload,
        };
      case SIGNUP_SUCCESS:{
        return{
            ...state,
            loading:false,
            signup:true,
            isAuthenticated: false,
            user: action.payload
        }
      }
      case SIGNUP_FAIL:
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          signup:false,
          login: false,
          user: null,
          error: action.payload,
        };
  
      case LOAD_USER_FAIL:
        return {
          ...state,
          isloading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
          crediantial: false,
        };
  
      case LOGOUT_USER:
        cookie.remove("token");
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
          crediantial: false,
        };
      default:
        return state;
    }
  };