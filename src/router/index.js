import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/Home.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import Cart from "@/components/Cart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "productDetails",
      path: "/products/:name",
      component: ProductDetails,
    },
    {
      name: "cart",
      path: "/cart",
      component: Cart,
    },
  ],
});

export default router;
