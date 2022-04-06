import request from 'umi-request';
/**
 *
 * @param {获取所有一级分类} params
 */
export async function queryCateOne() {
    return request('/api/productCategory/listLevelOne', {
      method: 'GET',
    });
  }
/**
 * 
 * @param {获取一级分类子分类} params 
 */
export async function queryCateOneChildren(params) {
  console.log("queryCateOneChildren-params",params);
  return request(`/api/productCategory/listByParentId/${params}`, {
    method: 'GET',
  });
}

/**
 * 
 * @param {获取二级分类} params 
 */
export async function queryTwoLevel(params) {
  console.log("queryTwoLevel-params",params);
  return request('/api/home/productCateList', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {获取当前用户} params 
 */
export async function currentUser(params) {
  console.log(params);
  return request('/api/ums_member/fetchByUsername', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {获取当前用户} params 
 */
export async function refreshToken() {
  return request('/api/ums_member/refreshToken', {
    method: 'GET',
  });
}

/**
 * 
 * @param {查询角色} params 
 */
export async function queryRole(params) {
  console.log("service-auth-queryRole-params",params);
  return request('/api/role/list', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {查询菜单} params 
 */
export async function queryMenu(params) {
  console.log("service-auth-queryMenu-params",params);
  return request('/api/menu/list', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {查询资源} params 
 */
export async function queryResource(params) {
  console.log("service-auth-queryResource-params",params);
  return request('/api/resource/list', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {查询资源分类} params 
 */
export async function queryResourceCate(params) {
  console.log("service-auth-queryResourceCate-params",params);
  return request('/api/resourceCategory/listAll', {
    method: 'GET',
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
export async function test(params) {
  return request('/api/ums_admin/test', {
    method: 'POST',
  });
}
