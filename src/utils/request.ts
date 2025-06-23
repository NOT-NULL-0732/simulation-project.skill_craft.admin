import axios from "axios";
import CONSTANT from "@/constant/constant";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: CONSTANT.API_BASE_URL,
  // 超时
  timeout: 60000,
});
/* 添加默认params */
request.interceptors.request.use(req => {
  return req;
});


export default request;
