import {
  CONFIRM_ORDER_BEGIN,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function confirmOrder(params) {
  console.log("confirmOrder-params", params);
  const{id} =params;
  return async (dispatch) => {
    dispatch({
      type: CONFIRM_ORDER_BEGIN,
    });

    const resq = request(`/api/orderPortal/confirmReceiveOrder/${id}`, {
      method: "GET",
    });

    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("confirmOrder-success", success);
        if (success) {
          dispatch({
            type: CONFIRM_ORDER_SUCCESS,
          });
        }

        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: CONFIRM_ORDER_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_ORDER_BEGIN:
      return {
        ...state,
        confirmOrderPending: true,
        confirmOrderError: null,
      };

    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        confirmOrderPending: false,
        confirmOrderError: null,
      };

    case CONFIRM_ORDER_FAIL:
      return {
        ...state,
        confirmOrderPending: false,
        confirmOrderError: action.data.error,
      };

    default:
      return state;
  }
}
