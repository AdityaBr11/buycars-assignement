import { OEM_REQ, OEM_SUCCESS, OEM_FAIL, SINGLE_OEM_REQ, SINGLE_OEM_SUCCESS, SINGLE_OEM_FAIL } from "./actionType";

export const oemReducer = (state = { oem: {} }, action) => {
  switch (action.type) {
    case SINGLE_OEM_REQ:
    case OEM_REQ:
      return { loading: true };
    case SINGLE_OEM_SUCCESS:
    case OEM_SUCCESS:
      return { ...state, loading: false, oem: action.payload, error: false };
    case SINGLE_OEM_FAIL:
    case OEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
