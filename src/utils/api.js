import http from '../utils/http'
import data from '../../public/url.json' // 引用
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let path = data
let resquest = path.url

// get请求
export function getListAPI(api,params){
  return http.get(`${resquest}/`+ api,params)
}
// post请求
export function postFormAPI(api,params){
  return http.post(`${resquest}/`+ api,params)
}
// put 请求
export function putSomeAPI(api,params){
  return http.put(`${resquest}/`+ api,params)
}
// delete 请求
export function deleteListAPI(api,params){
  return http.delete(`${resquest}/`+ api,params)
}
