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

export function hear () {
  return fetch({
    url: '/hear',
    method: 'GET'
  })
}
