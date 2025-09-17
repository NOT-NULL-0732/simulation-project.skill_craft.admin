<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen w-full flex flex-col">
    <header class="px-4 py-2 bg-green-500 w-full">
      <p>智慧课堂管理系统</p>
    </header>
    <div class="flex-1 flex items-stretch">
      <el-menu background-color="#ffffff" :router="true">
        <el-menu-item class="flex justify-center !h-[40px]" index="1" :route="{ name: 'admin-dashboard' }"
        >仪表盘
        </el-menu-item>
        <el-menu-item class="flex justify-center !h-[40px]" index="1" :route="{ name: 'admin-user' }"
          >用户管理
        </el-menu-item>
        <el-menu-item class="flex justify-center !h-[40px]" index="2">这是2个菜单</el-menu-item>
        <el-menu-item class="flex justify-center !h-[40px]" index="3">这是3个菜单</el-menu-item>
        <el-menu-item class="flex justify-center !h-[40px]" index="4">这是4个菜单</el-menu-item>
      </el-menu>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
