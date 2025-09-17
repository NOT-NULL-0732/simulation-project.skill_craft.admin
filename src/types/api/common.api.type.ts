import type { AxiosResponse } from "axios";

export type ApiSuccessResponse<T> = {
  code: 200;
  message: "请求成功";
  data: T;
};

export type ApiErrorResponse<T extends number> = {
  code: T;
  message: string;
};

export type CreateApiErrorResponseEnum<T extends number[]> = ApiErrorResponse<T[number]>;
export type CreateApiAllResponseEnum<T, K extends number[]> = AxiosResponse<
  ApiSuccessResponse<T> | CreateApiErrorResponseEnum<K>
>;
