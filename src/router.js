import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./store/user";
const lazyLoad = (view) => {
  return () => import(`./views/${view}.vue`);
};

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: lazyLoad("Home"),
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "Login",
      component: lazyLoad("Login"),
    },
    {
      path: "/register",
      name: "Register",
      component: lazyLoad("Register"),
    },
  ],
});

export default router;
