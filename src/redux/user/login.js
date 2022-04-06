import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";
import storageUtils from "../../utils/storageUtils";

//登录
export function login(params) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_BEGIN,
    });

    const resq = request("/api/ums_member/login", {
      method: "POST",
      data: { ...params },
    });
    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("login-success", success);

        if (success) {
          const user = response.data;
          console.log("user", user);
          storageUtils.saveUser(user); //保存在本地，这样刷新也会继续存在

          dispatch({
            type: LOGIN_SUCCESS,
            data: { user },
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: LOGIN_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loginPending: true,
        loginError: null,
      };

    case LOGIN_SUCCESS:
      initialState.user = action.data.user;
      return {
        ...state,
        loginPending: false,
        loginError: null,
        user: action.data.user,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    default:
      return state;
  }
}
