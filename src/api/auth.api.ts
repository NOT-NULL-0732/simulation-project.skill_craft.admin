import request from "@/utils/request";
import type { AuthModule } from "@/types/api";

function login(data: AuthModule["login"]["body"]): AuthModule["login"]["result"] {
  return request({
    method: "POST",
    url: "/auth/login",
    data: {
      email: data.email,
      password: data.password,
    },
  });
}

function listUser(): AuthModule["listUser"]["result"] {
  return request({
    url: "/auth/user",
    method: "GET",
  });
}

const ApiAuth = {
  login,
  listUser,
};
export default ApiAuth;
