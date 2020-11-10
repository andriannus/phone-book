import { createRouter, createWebHistory } from "vue-router";

import landingRoutes from "@/app/landing/landing.routes";

const routes = [...landingRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
