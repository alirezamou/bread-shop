import { createStore } from "vuex";

import { getProducts } from "../services/productServices";

const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const products = await getProducts();
        commit("SET_PRODUCTS", products);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default store;
