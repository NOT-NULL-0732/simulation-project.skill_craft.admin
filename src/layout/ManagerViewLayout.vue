<script setup lang="ts">
import { Stamp, User } from "@element-plus/icons-vue";
</script>

<template>
  <div class="min-h-screen w-full flex flex-col">
    <header class="px-4 py-2 bg-green-500 w-full">
      <p>智慧课堂管理系统</p>
    </header>
    <div class="flex-1 flex items-stretch">
      <el-menu background-color="#ffffff" :router="true" default-active="1">
        <el-menu-item class="text-center" index="1" :route="{ name: 'admin-dashboard' }"
          >仪表盘</el-menu-item
        >
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" :route="{ name: 'admin-user' }">用户管理 </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Stamp />
            </el-icon>
            <span>课程管理</span>
          </template>
          <el-menu-item-group>
            <!-- 课程管理 -->
            <el-menu-item index="3-1" :route="{ name: 'admin-course' }">课程管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="4">这是3个菜单</el-menu-item>
        <el-menu-item index="5">这是4个菜单</el-menu-item>
      </el-menu>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
