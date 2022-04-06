import {
    UPDATEATTR_BEGIN,
    UPDATEATTR_SUCCESS,
    UPDATEATTR_FAIL,
  } from "../constants";
  import request from "umi-request";
  import initialState from "../initialState";
  
  //根据购物车信息生成订单
  export function updateAttr(params) {
    console.log("updateAttr-params", params);
    return async (dispatch) => {
      dispatch({
        type: UPDATEATTR_BEGIN,
      });
  
      const resq = request("/api/cart/update/attrAndquantity", {
        method: "POST",
        data:{
          ...params,
        }
      })
      const res = await resq.then(function (response) {
          console.log(response);
          const success = response.code === 200 ? true : false;
          console.log("updateAttr-success", success);
          if (success) {
            dispatch({
              type: UPDATEATTR_SUCCESS,
            });
          }
          return success;
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: UPDATEATTR_FAIL,
            data: { error },
          });
        });
      console.log("res",res);
      return res;    
    };
  }
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case UPDATEATTR_BEGIN:
        return {
          ...state,
          updateAttrPending: true,
          updateAttrError: null,
        };
  
      case UPDATEATTR_SUCCESS:
        return {
          ...state,
          updateAttrPending: false,
          updateAttrError: null,
        };
  
      case UPDATEATTR_FAIL:
        return {
          ...state,
          updateAttrPending: false,
          updateAttrError: action.data.error,
        };
  
      default:
        return state;
    }
  }
  