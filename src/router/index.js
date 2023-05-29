import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import HomeIndex from "@/views/home/index.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: HomePage,
      children: [
        {
          path: "/home",
          component: HomeIndex
        }
      ]
    }
  ]
});

export default router;
