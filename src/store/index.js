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
    getSize: (state) => (productName, sizeIndex) => {
      const product = state.products.find(
        (product) => product.name == productName
      );
      return product.sizes[sizeIndex].size;
    },
    getFeePrice: (state) => (productName, sizeIndex) => {
      const product = state.products.find(
        (product) => product.name == productName
      );
      return product.sizes[sizeIndex].price;
    },
    getDisplayName: (state) => (productName) => {
      return state.products.find((product) => product.name === productName)
        .displayName;
    },
    totalCartPrice: (state) => {
      return state.cart.reduce((accPrice, currentOrder) => {
        return accPrice + currentOrder.price * currentOrder.quantity;
      }, 0);
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_TO_CART(state, newOrder) {
      const productInCart = state.cart.find(
        (cartItem) => cartItem.productName === newOrder.productName
      );
      if (productInCart) {
        if (productInCart.sizeIndex === newOrder.sizeIndex) {
          productInCart.quantity += newOrder.quantity;
        } else {
          productInCart.sizeIndex = newOrder.sizeIndex;
          productInCart.quantity = newOrder.quantity;
          productInCart.price = newOrder.price;
        }
      } else {
        state.cart.push(newOrder);
      }
    },
    DELETE_ITEM_FROM_CART(state, deletingItem) {
      state.cart.splice(
        state.cart.findIndex((item) => item === deletingItem),
        1
      );
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
