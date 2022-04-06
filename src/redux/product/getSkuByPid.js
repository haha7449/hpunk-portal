import {
  GET_SKU_BY_PID_BEGIN,
  GET_SKU_BY_PID_SUCCESS,
  GET_SKU_BY_PID_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getSkuByPid(params) {
  console.log("getSkuByPid-params", params);
  const { pid } = params;
  return async (dispatch) => {
    dispatch({
      type: GET_SKU_BY_PID_BEGIN,
    });

    const resq = request(`/api/skuPortal/selectByPid/${pid}`, {
      method: "GET",
    });

    const res = await resq
      .then(function (response) {
        console.log(response);
        const skuList = response.data;

        const success = response.code === 200 ? true : false;
        console.log("generateOrder-success", success);
        if (success) {
          dispatch({
            type: GET_SKU_BY_PID_SUCCESS,
            data: { skuList },
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_SKU_BY_PID_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SKU_BY_PID_BEGIN:
      return {
        ...state,
        getSkuByPidPending: true,
        getSkuByPidError: null,
      };

    case GET_SKU_BY_PID_SUCCESS:
      return {
        ...state,
        getSkuByPidPending: false,
        getSkuByPidError: null,
        skuList: action.data.skuList,
      };

    case GET_SKU_BY_PID_FAIL:
      return {
        ...state,
        getSkuByPidPending: false,
        getSkuByPidError: action.data.error,
      };

    default:
      return state;
  }
}
