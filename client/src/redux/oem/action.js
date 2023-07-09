import axios from "axios";
import { OEM_REQ, OEM_SUCCESS, OEM_FAIL, SINGLE_OEM_REQ, SINGLE_OEM_SUCCESS, SINGLE_OEM_FAIL } from "./actionType";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const getAllOem =
  (q = "", price = "", milege = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: OEM_REQ });

      const params = new URLSearchParams();
      params.append("q", q);
      params.append("price", price);
      params.append("mileage", milege);

      const { data } = await axios.get(
        `http://localhost:8080/rootoem?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.get("token"),
          },
        }
      );
      dispatch({ type: OEM_SUCCESS, payload: data.Item });
      console.log(data.Item, "oemmmm data");
    } catch (err) {
      console.log(err);
      dispatch({ type: OEM_FAIL, payload: err.response.data.message });
    }
  };

export const singleOem = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_OEM_REQ });
    const { data } = await axios.get(`http://localhost:8080/rootoem/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: cookie.get("token"),
      },
    });
    dispatch({ type: SINGLE_OEM_SUCCESS, payload: data.Item });
  } catch (e) {
    dispatch({ type: SINGLE_OEM_FAIL, payload: e.response.data.msg });
  }
};
