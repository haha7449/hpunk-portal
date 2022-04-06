import {
  REMOVE_CART_ITEM_BEGIN,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//删除购物车单元
export function removeCartItem(params) {
  console.log("removeCartItem-params", params);
  return async (dispatch) => {
    dispatch({
      type: REMOVE_CART_ITEM_BEGIN,
    });

    const resq = request("/api/cart/update/deleteStatus", {
      method: "POST",
      params,
    });
    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("removeCartItem-success", success);
        if (success) {
          dispatch({
            type: REMOVE_CART_ITEM_SUCCESS,
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: REMOVE_CART_ITEM_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CART_ITEM_BEGIN:
      return {
        ...state,
        removeCartItemPending: true,
        removeCartItemError: null,
      };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        removeCartItemPending: false,
        removeCartItemError: null,
      };

    case REMOVE_CART_ITEM_FAIL:
      return {
        ...state,
        removeCartItemPending: false,
        removeCartItemError: action.data.error,
      };

    default:
      return state;
  }
}
