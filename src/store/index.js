import { createStore } from "vuex";

import { getProducts } from "../services/productServices";

const store = createStore({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    getProductByName: (state) => (productName) => {
      return state.products.find((product) => product.name === productName);
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_TO_CART(state, order) {
      state.cart.push(order);
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
