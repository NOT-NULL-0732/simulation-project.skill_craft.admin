import request from "@/utils/request";
import type { AuthApiLogin } from "@/types/api";

export function login(data: AuthApiLogin["data"]): AuthApiLogin["result"] {
  return request({
    method: "POST",
    url: "/auth/login",
    data: {
      email: data.email,
      password: data.password,
    },
  });
}
const ApiAuth = {
  login,
};
export default ApiAuth;
