<script setup lang="ts">
import ApiAuth from "@/api/auth.api";
import type { UserInfo } from "@/types/api";
import { ElMessageBox } from "element-plus";

enum FormModal {
  CREATE,
  UPDATE,
}

const userData = ref<UserInfo[]>([]);

// 创建或更新用户
const dialogShow = ref(false);
const dataLoading = ref(true);
const formModal = ref<FormModal>(FormModal.CREATE);
const form = ref({
  username: "",
  email: "",
  password: "",
  id: "",
});

handleListUser();

async function handleSubmitDialogForm() {
  if (formModal.value === FormModal.CREATE) {
    const createUserResponse = await ApiAuth.createUser({
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
    });
    if (createUserResponse.data.code === 200) {
      ElMessage({
        type: "success",
        message: `创建成功ID为：${createUserResponse.data.data.userId}的用户`,
        duration: 0,
        showClose: true,
      });
    }
  } else if (formModal.value === FormModal.UPDATE) {
    const updateUserResponse = await ApiAuth.updateUser(
      {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      },
      {
        userId: form.value.id,
      }
    );
  }
  ElMessage({
    type: "success",
    message:
      formModal.value === FormModal.CREATE
        ? "创建成功"
        : formModal.value === FormModal.UPDATE
          ? "更新成功"
          : "神秘操作",
  });
  dialogShow.value = false;
  await handleListUser();
}

function handleResetForm() {
  form.value.username = "";
  form.value.id = "";
  form.value.email = "";
  form.value.password = "";
}

async function handleListUser() {
  dataLoading.value = true;
  ApiAuth.listUser()
    .then(result => {
      if (result.data.code === 200) {
        userData.value = result.data.data;
      }
    })
    .finally(() => {
      dataLoading.value = false;
    });
}

function handleCreateUser() {
  handleResetForm();
  formModal.value = FormModal.CREATE;
  dialogShow.value = true;
}

function handleUpdateUser(userInfo: UserInfo) {
  handleResetForm();
  formModal.value = FormModal.UPDATE;
  form.value.id = userInfo.userId;
  form.value.username = userInfo.userUsername;
  form.value.email = userInfo.userEmail;
  form.value.password = "";
  dialogShow.value = true;
}

function handleDeleteUser(userId: string) {
  ElMessageBox.confirm(`是否删除ID为${userId}的用户`, "删除用户", {
    type: "warning",
    confirmButtonText: "删除",
    cancelButtonText: "取消",
  }).then(() => {
    ApiAuth.deleteUser({ userId });
    handleListUser();
  });
}

function handleRefreshUser() {
  handleListUser();
}
</script>

<template>
  <div>
    <h1>这是用户管理界面</h1>
    <div>
      <el-button type="primary" @click="handleCreateUser">创建用户</el-button>
      <el-button type="info" @click="handleRefreshUser">刷新数据</el-button>
    </div>
    <el-table :data="userData" v-loading="dataLoading">
      <el-table-column label="用户ID" prop="userId"></el-table-column>
      <el-table-column label="用户名" prop="userUsername"></el-table-column>
      <el-table-column label="邮箱" prop="userEmail"></el-table-column>
      <el-table-column label="角色">
        <template #default="{ row }: { row: UserInfo }">
          <el-tag v-for="role in row.role" type="primary">{{ role.name }} </el-tag>
        </template>
      </el-table-column>
      --
      <el-table-column label="创建时间" prop="userCreatedAt">
        <template #default="{ row }: { row: UserInfo }">
          {{ new Date(row.userCreatedAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }: { row: UserInfo }">
          <el-button type="warning" @click="handleUpdateUser(row)">更改 </el-button>
          <el-button type="danger" @click="handleDeleteUser(row.userId)">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :model-value="dialogShow" @close="dialogShow = false">
      <template #header>创建用户</template>
      <template #default>
        <el-form :model="form" label-position="top">
          <el-form-item prop="id" label="用户ID" v-if="formModal === FormModal.UPDATE">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-button class="w-full" type="primary" @click="handleSubmitDialogForm">
            <template v-if="formModal === FormModal.CREATE">添加</template>
            <template v-if="formModal === FormModal.UPDATE">修改</template>
          </el-button>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
