import { defineStore } from "pinia";
import { ref, watch } from "vue";

export enum UserStatusEnum {
  NOT_LOGIN,
  LOGGED,
  WAIT_VALIDATE,
}

export interface UserStoreWithUser {
  user_id: string;
  username: string;
  user_token: string;
  version: number;
}

export const userStore = defineStore("user", () => {
  const userStorageKey = "storage:userStore:user";
  const user = ref<UserStoreWithUser>({
    user_id: "",
    username: "",
    user_token: "",
    version: 1,
  });
  const userStatus = ref<UserStatusEnum>(UserStatusEnum.WAIT_VALIDATE);
  const localStorageUserData = localStorage.getItem(userStorageKey);
  if (localStorageUserData === null) {
    userStatus.value = UserStatusEnum.NOT_LOGIN;
  } else {
    const localStorageUserJsonData = JSON.parse(localStorageUserData) as UserStoreWithUser;
    if (localStorageUserJsonData.version === user.value.version) {
      user.value = localStorageUserJsonData;
      if (!user.value.user_token) userStatus.value = UserStatusEnum.NOT_LOGIN;
    } else {
      userStatus.value = UserStatusEnum.NOT_LOGIN;
    }
  }

  if (user.value.user_token) userStatus.value = UserStatusEnum.LOGGED;

  watch(
    user,
    value => {
      localStorage.setItem(userStorageKey, JSON.stringify(value));
    },
    {
      deep: true,
    }
  );

  return {
    user,
    userStatus,
  };
});
