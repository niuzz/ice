import fetch from './fetch'
/**
 * 测试
 * @param {*} params
 */
export function signature (params) {
  return fetch({
    url: '/signature',
    method: 'GET',
    params: params
  })
}

export function oauth (params) {
  return fetch({
    url: '/redirect',
    method: 'GET',
    params: params
  })
}

export function test () {
  return fetch({
    url: '/test',
    method: 'GET'
  })
}
