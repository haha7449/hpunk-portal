import request from 'umi-request';
/**
 * 
 * @param {获取商品列表} params 
 */
export async function getProductList(params) {
  console.log("getProductList-params",params);
  return request('/api/product/list', {
    method: 'GET',
    params,
  });
}
/**
 * 
 * @param {通过分类获取商品列表} params 
 */
export async function getProductListByCate(params) {
  console.log("getProductListByCate-params",params);
  return request('/api/home/list', {
    method: 'GET',
    params,
  });
}
/**
 * 
 * @param {模糊查询} params 
 */
export async function getProductSimpleList(params) {
  console.log("getProductSimpleList-params",params);
  return request('/api/product/simpleList', {
    method: 'GET',
    params,
  });
}

/**
 * 
 * @param {查询商品详情ById} params 
 */
export async function getProductDetail(params) {
  console.log("getProductDetail-params",params);
  return request(`/api/product/detail/${params}`, {
    method: 'GET',
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
