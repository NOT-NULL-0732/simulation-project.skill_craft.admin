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

function createUser(data: AuthModule["createUser"]["body"]): AuthModule["createUser"]["result"] {
  return request({
    url: "/auth/user",
    method: "POST",
    data,
  });
}

function updateUser(
  data: AuthModule["updateUser"]["body"],
  params: AuthModule["updateUser"]["params"]
) {
  return request({
    url: "/auth/user/" + params.userId,
    method: "PATCH",
    data,
  });
}

function deleteUser(params: AuthModule["deleteUser"]["params"]) {
  return request({
    url: "/auth/user/" + params.userId,
    method: "DELETE",
    params,
  });
}

const ApiAuth = {
  login,
  listUser,
  createUser,
  updateUser,
  deleteUser,
};
export default ApiAuth;
