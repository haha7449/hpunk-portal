import { REGISTER_BEGIN, REGISTER_SUCCESS, REGISTER_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//注册
export function register(params) {
  console.log("register-params", params);
  return async (dispatch) => {
    dispatch({
      type: REGISTER_BEGIN,
    });

    const resq = request("/api/ums_member/register", {
      method: "POST",
      data: { ...params },
    })
    const res = await resq.then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("register-success", success);
        if (success) {
          dispatch({
            type: REGISTER_SUCCESS,
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: REGISTER_FAIL,
          data: { error },
        });
      });
    console.log("res",res);
    return res;    
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_BEGIN:
      return {
        ...state,
        registerPending: true,
        registerError: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerPending: false,
        registerError: null,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        registerPending: false,
        registerError: action.data.error,
      };

    default:
      return state;
  }
}
