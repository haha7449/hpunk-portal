import {
  UPDATE_PWD_BEGIN,
  UPDATE_PWD_SUCCESS,
  UPDATE_PWD_FAIL,
  } from "../constants";
  import request from "umi-request";
  import initialState from "../initialState";
  
  //根据购物车信息生成订单
  export function updatePwd(params) {
    console.log("updatePwd-params", params);
    return async (dispatch) => {
      dispatch({
        type: UPDATE_PWD_BEGIN,
      });
  
      const resq = request("/api/ums_member/updatePassword", {
        method: "POST",
        data:params,
      })
      const res = await resq.then(function (response) {
          console.log(response);
          const success = response.code === 200 ? true : false;
          console.log("updatePwd-success", success);
          if (success) {
            dispatch({
              type: UPDATE_PWD_SUCCESS,
            });
          }
          return success;
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: UPDATE_PWD_FAIL,
            data: { error },
          });
        });
      console.log("res",res);
      return res;    
    };
  }
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_PWD_BEGIN:
        return {
          ...state,
          updatePwdPending: true,
          updatePwdError: null,
        };
  
      case UPDATE_PWD_SUCCESS:
        return {
          ...state,
          updatePwdPending: false,
          updatePwdError: null,
        };
  
      case UPDATE_PWD_FAIL:
        return {
          ...state,
          updatePwdPending: false,
          updatePwdError: action.data.error,
        };
  
      default:
        return state;
    }
  }
  