import {
  ADD_TO_CART_BEGIN,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";
import { message } from "antd";

//获取商品详情ById
export function addToCart(params) {
  console.log("addToCart-params", params);
  return async (dispatch) => {
    dispatch({
      type: ADD_TO_CART_BEGIN,
    });

    const resq = request("/api/cart/add", {
      method: "POST",
      data: {
        ...params,
      },
    })
    const res = await resq.then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("addToCart-success", success);
        if (success) {
          dispatch({
            type: ADD_TO_CART_SUCCESS,
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: ADD_TO_CART_FAIL,
          data: { error },
        });
      });
    console.log("res",res);
    return res;    
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_BEGIN:
      return {
        ...state,
        addToCartPending: true,
        addToCartError: null,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartPending: false,
        addToCartError: null,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        addToCartPending: false,
        addToCartError: action.data.error,
      };

    default:
      return state;
  }
}
