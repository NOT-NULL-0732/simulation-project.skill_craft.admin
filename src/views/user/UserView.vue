<script setup lang="ts">
import ApiAuth from "@/api/auth.api";
import type { UserInfo } from "@/types/api";

const userData = ref<UserInfo[]>([]);

ApiAuth.listUser().then(result => {
  if (result.data.code === 200) {
    userData.value = result.data.data;
  }
});
</script>

<template>
  <h1>这是用户管理界面</h1>
  <el-table :data="userData">
    <el-table-column label="用户ID" prop="userId"></el-table-column>
    <el-table-column label="创建时间" prop="userCreatedAt"></el-table-column>
    <el-table-column label="用户名" prop="userUsername"></el-table-column>
    <el-table-column label="用户角色">
      <template #default="{ row }">
        <el-tag v-for="role in row.role" type="primary">{{ role.name }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
