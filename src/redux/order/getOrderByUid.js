import {
  GET_ORDER_BY_UID_BEGIN,
  GET_ORDER_BY_UID_SUCCESS,
  GET_ORDER_BY_UID_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getOrderByUid(params) {
  console.log("getOrderByUid-params", params);
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_BY_UID_BEGIN,
    });

    const resq = request("/api/orderPortal/listByUid", {
      method: "GET",
      params,
    });

    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("getOrderByUid-success", success);
        if (success) {
          const orderList = response.data.list;
          const { pageNum, totalPage: total, pageSize } = response.data;
          const orderPagination = { pageNum, total, pageSize };

          const { list } = response.data;
          const orderStatus = [];
          dispatch({
            type: GET_ORDER_BY_UID_SUCCESS,
            data: { orderList, orderPagination, orderStatus },
          });
        }

        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_ORDER_BY_UID_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_BY_UID_BEGIN:
      return {
        ...state,
        getOrderByUidPending: true,
        getOrderByUidError: null,
      };

    case GET_ORDER_BY_UID_SUCCESS:
      return {
        ...state,
        getOrderByUidPending: false,
        getOrderByUidError: null,
        orderList: action.data.orderList,
        orderPagination: action.data.orderPagination,
        orderStatus: action.data.orderStatus,
      };

    case GET_ORDER_BY_UID_FAIL:
      return {
        ...state,
        getOrderByUidPending: false,
        getOrderByUidError: action.data.error,
      };

    default:
      return state;
  }
}
