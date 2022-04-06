import {
  GET_ORDER_ITEM_BY_OID_BEGIN,
  GET_ORDER_ITEM_BY_OID_SUCCESS,
  GET_ORDER_ITEM_BY_OID_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getOrderItemByOid(params) {
  console.log("getOrderItemByOid-params", params);
  const {oid} = params;
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_ITEM_BY_OID_BEGIN,
    });

    const resq = request(`/api/orderPortal/orderItemList/${oid}`, {
      method: "GET",
    });

    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("getOrderItemByOid-success", success);
        if (success) {
          const {data:orderItemList } = response;
          dispatch({
            type: GET_ORDER_ITEM_BY_OID_SUCCESS,
            data: { orderItemList },
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_ORDER_ITEM_BY_OID_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ITEM_BY_OID_BEGIN:
      return {
        ...state,
        getOrderItemByOidPending: true,
        getOrderItemByOidError: null,
      };

    case GET_ORDER_ITEM_BY_OID_SUCCESS:
      return {
        ...state,
        getOrderItemByOidPending: false,
        getOrderItemByOidError: null,
        orderItemList: action.data.orderItemList,

      };

    case GET_ORDER_ITEM_BY_OID_FAIL:
      return {
        ...state,
        getOrderItemByOidPending: false,
        getOrderItemByOidError: action.data.error,
      };

    default:
      return state;
  }
}
