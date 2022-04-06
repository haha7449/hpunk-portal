import {
  UPDATE_INFO_BEGIN,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";
import storageUtils from "../../utils/storageUtils";

export function updateInfo(params) {
  console.log("updateInfo-params", params);
  const { id } = params;
  return async (dispatch) => {
    dispatch({
      type: UPDATE_INFO_BEGIN,
    });

    const resq = request('/api/ums_member/updateInfo', {
      method: "POST",
      data: params,
    });
    const res = await resq
      .then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("updateInfo-success", success);
        if (success) {
          storageUtils.removeUser();
          const user = response.data;
          console.log("newUser", user);
          storageUtils.saveUser(user); //保存在本地，这样刷新也会继续存在

          dispatch({
            type: UPDATE_INFO_SUCCESS,
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: UPDATE_INFO_FAIL,
          data: { error },
        });
      });
    console.log("res", res);
    return res;
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INFO_BEGIN:
      return {
        ...state,
        updateInfoPending: true,
        updateInfoError: null,
      };

    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        updateInfoPending: false,
        updateInfoError: null,
      };

    case UPDATE_INFO_FAIL:
      return {
        ...state,
        updateInfoPending: false,
        updateInfoError: action.data.error,
      };

    default:
      return state;
  }
}
