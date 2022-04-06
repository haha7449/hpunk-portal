import {
  GET_ORDER_COUNT_BEGIN,
  GET_ORDER_COUNT_SUCCESS,
  GET_ORDER_COUNT_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getOrderCount(params) {
  console.log("getOrderCount-params", params);
  const{id} =params;
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_COUNT_BEGIN,
    });

    const resq = request(`/api/home/getOrderCount/${id}`, {
      method: "GET",
    });

    const res = await resq
      .then(function (response) {
        console.log("getOrderCount-response",response);
        const success = response.code === 200 ? true : false;
        console.log("getOrderCount-success", success);
        if (success) {
          const {data:orderCount} = response;
          dispatch({
            type: GET_ORDER_COUNT_SUCCESS,
            data:{orderCount},
          });
        }

        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_ORDER_COUNT_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_COUNT_BEGIN:
      return {
        ...state,
        getOrderCountPending: true,
        getOrderCountError: null,
      };

    case GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        getOrderCountPending: false,
        getOrderCountError: null,
        orderCount:action.data.orderCount,
      };

    case GET_ORDER_COUNT_FAIL:
      return {
        ...state,
        getOrderCountPending: false,
        getOrderCountError: action.data.error,
      };

    default:
      return state;
  }
}
