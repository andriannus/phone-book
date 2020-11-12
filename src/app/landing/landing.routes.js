const landingRoutes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/landing",
    name: "Landing",
    component: () => import(/* webpackChunkName: "landing" */ "./Landing.vue"),
  },
];

export default landingRoutes;
