import axios from "axios";
import { userStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: location.origin + "/api",
  // 超时
  timeout: 60000,
});
/* 添加默认params */
request.interceptors.request.use(req => {
  const useUserStore = userStore();
  const { user } = storeToRefs(useUserStore);
  req.headers.setAuthorization("Bearer " + user.value.user_token);
  return req;
});

export default request;
