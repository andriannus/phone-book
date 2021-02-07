import { RouteRecordRaw } from "vue-router";

const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "./not-found.component"),
  },
];

export default notFoundRoutes;
