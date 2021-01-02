import { RouteRecordRaw } from "vue-router";

const landingRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/landing",
    name: "Landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "./landing.component.vue"),
  },
];

export default landingRoutes;
