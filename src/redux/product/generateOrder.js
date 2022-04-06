import {
    GENERATEORDER_BEGIN,
    GENERATEORDER_SUCCESS,
    GENERATEORDER_FAIL,
  } from "../constants";
  import request from "umi-request";
  import initialState from "../initialState";
  
  //根据购物车信息生成订单
  export function generateOrder(params) {
    console.log("generateOrder-params", params);
    return async (dispatch) => {
      dispatch({
        type: GENERATEORDER_BEGIN,
      });
  
      const resq = request("/api/orderPortal/generateOrder", {
        method: "POST",
        data:{
          ...params,
        }
      })
      const res = await resq.then(function (response) {
          console.log(response);
          const success = response.code === 200 ? true : false;
          console.log("generateOrder-success", success);
          if (success) {
            dispatch({
              type: GENERATEORDER_SUCCESS,
            });
          }
          return success;
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: GENERATEORDER_FAIL,
            data: { error },
          });
        });
      console.log("res",res);
      return res;    
    };
  }
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case GENERATEORDER_BEGIN:
        return {
          ...state,
          generateOrderPending: true,
          generateOrderError: null,
        };
  
      case GENERATEORDER_SUCCESS:
        return {
          ...state,
          generateOrderPending: false,
          generateOrderError: null,
        };
  
      case GENERATEORDER_FAIL:
        return {
          ...state,
          generateOrderPending: false,
          generateOrderError: action.data.error,
        };
  
      default:
        return state;
    }
  }
  