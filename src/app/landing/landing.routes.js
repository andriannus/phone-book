const landingRoutes = [
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
