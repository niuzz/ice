import fetch from './fetch'
/**
 * 测试
 * @param {*} params
 */
export function login (params) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

export function register (params) {
  return fetch({
    url: '/user',
    method: 'post',
    data: params
  })
}
