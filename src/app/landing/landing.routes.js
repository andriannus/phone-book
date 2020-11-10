const landingRoutes = [
  {
    path: "/",
    name: "Landing",
    component: () => import(/* webpackChunkName: "landing" */ "./Landing.vue"),
  },
];

export default landingRoutes;
