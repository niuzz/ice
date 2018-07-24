import fetch from './fetch'
/**
 * 测试
 * @param {*} params
 */
export function test (params) {
  return fetch({
    url: '/hear',
    method: 'GET',
    params: params
  })
}
