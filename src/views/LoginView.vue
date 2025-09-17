<script setup lang="ts">
import { ElForm, type FormInstance, type FormRules } from "element-plus";
import ApiAuth from "@/api/auth.api";
import { UserStatusEnum, userStore } from "@/stores/user.store";
import { replaceAdminDashboard } from "@/router";
import { storeToRefs } from "pinia";

const formRef = ref<FormInstance>();
const rules: FormRules<typeof formData> = {
  email: [
    {
      type: "string",
      min: 1,
      max: 50,
    },
    {
      type: "email",
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
    },
    {
      type: "string",
      trigger: "blur",
      min: 8,
      max: 12,
    },
  ],
};
const formData = reactive({
  email: "admin@example.com",
  password: "12345678",
});
const formEl = formRef.value;

const useUserStore = userStore();
const { user, userStatus } = storeToRefs(useUserStore);
watch(
  userStatus,
  value => {
    console.log("这个值触发变化", value);
    if (value === UserStatusEnum.LOGGED) replaceAdminDashboard();
  },
  {
    immediate: true,
  }
);

async function handleFormSubmit(formInstance: FormInstance | undefined) {
  if (!formInstance) return;
  const validateResult = await formInstance.validate();
  if (!validateResult) return;
  const loginResponse = await ApiAuth.login({
    email: formData.email,
    password: formData.password,
  });
  const loginResponseData = loginResponse.data;
  if (loginResponseData.code === 200) {
    ElMessage({
      type: "success",
      message: "登陆成功",
    });
    user.value.user_token = loginResponseData.data.user_token;
    user.value.user_id = loginResponseData.data.userId;
    user.value.username = loginResponseData.data.username;
    userStatus.value = UserStatusEnum.LOGGED;
    console.log(user.value);
    await replaceAdminDashboard();
  } else {
    // TODO 错误码处理
    ElMessage({
      type: "error",
      message: loginResponseData.message,
    });
    // loginResponse.message
  }
}

onMounted(() => {
  if (!formEl) return;
  // formEl.
});
</script>

<template>
  <div class="min-w-full min-h-screen flex justify-center items-center">
    <div class="border p-4 rounded-md">
      <h2 class="text-center mb-4">登陆界面</h2>
      <div class="w-[400px]">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <el-button @click="() => handleFormSubmit(formRef)" class="w-full" type="success"
            >确认登陆
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
