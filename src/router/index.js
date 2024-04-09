import Vue from "vue";
import VueRouter from "vue-router";
import UserDetails from "@/views/UserDetails.vue";
import UsersTable from "@/views/UsersTable.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/users",
  },
  {
    path: "/users",
    name: "Users",
    component: UsersTable,
  },

  {
    path: "/user/:name/:id",
    name: "User",
    component: UserDetails,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
