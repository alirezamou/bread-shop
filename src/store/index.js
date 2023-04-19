import { createStore } from "vuex";

import { getProducts } from "../services/productServices";
import { addOrder } from "../services/orderServices";

const store = createStore({
  state: {
    products: [],
    cart: [],
    customer: null,
    order: null,
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
    SET_CUSTOMER(state, customer) {
      state.customer = JSON.parse(JSON.stringify(customer));
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
  },
  actions: {
    async addOrder({ commit }, order) {
      try {
        await addOrder(order);

        commit("SET_CUSTOMER", order.customer);
        commit("SET_ORDER", order);
        commit("CLEAR_CART");
      } catch (error) {
        console.log(error);
      }
    },
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
