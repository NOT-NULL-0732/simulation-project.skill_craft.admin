import type { CreateApiAllResponseEnum } from "@/types/api/common.api.type";

export interface UserInfo {
  userId: string;
  userCreatedAt: string;
  userUsername: string;
  role: Array<{ id: string; name: string }>;
}

export interface AuthModule {
  login: {
    body: {
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
  };
  listUser: {
    result: Promise<CreateApiAllResponseEnum<UserInfo[], []>>;
  };
}
