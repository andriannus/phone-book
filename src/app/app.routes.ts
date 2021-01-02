import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import landingRoutes from "@/app/landing/landing.routes";
import notFoundRoutes from "@/app/not-found/not-found.routes";

const routes: RouteRecordRaw[] = [...landingRoutes, ...notFoundRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
