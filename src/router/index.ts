import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { UserStatusEnum, userStore } from "@/stores/user.store";
import userRoutes from "@/router/user.route";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/layout/ManagerViewLayout.vue"),
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        ...userRoutes,
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (typeof to.name === "string") {
    const isAdminView = new RegExp("^admin-.*?$").test(to.name);
    const useUserStore = userStore();
    // TODO 这里改修改成异步的，当userStatus不为WaitValidate才做验证
    if (isAdminView && useUserStore.userStatus !== UserStatusEnum.LOGGED)
      next({
        name: "login",
      });
  }
  next();
});

export async function replaceAdminDashboard() {
  await router.replace({ name: "admin-dashboard" });
}

export default router;
