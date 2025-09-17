import type { RouteRecordRaw } from "vue-router";

const userRoutes: RouteRecordRaw[] = [
  {
    path: "user",
    name: "admin-user",
    component: () => import("@/views/user/UserView.vue"),
  },
];

export default userRoutes;
