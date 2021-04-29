import http from '../utils/http'
import Vue from 'vue'
// import data from '../../public/url.json' // 引用

let resquest = Vue.prototype.url

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
