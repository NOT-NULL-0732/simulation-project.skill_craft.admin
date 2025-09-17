import type { CreateApiAllResponseEnum } from "@/types/api/common.api.type";

export interface AuthApiLogin {
  data: {
    email: string;
    password: string;
  };
  result: Promise<
    CreateApiAllResponseEnum<
      {
        userId: string;
        user_token: string;
        username: string;
      },
      [1001, 1002, 1003] // TODO 填入正确的错误码
    >
  >;
}
