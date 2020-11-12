const notFoundRoutes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "./NotFound.vue"),
  },
];

export default notFoundRoutes;
