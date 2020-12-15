const notFoundRoutes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "./not-found.component.vue"),
  },
];

export default notFoundRoutes;
