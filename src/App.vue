<template>
  <div class="px-4 py-1 d-flex justify-content-between mb-4" id="cart-container">
    <router-link to="/" id="brand-link">علیرضا بیکری</router-link>
    <router-link to="/cart" id="cart-link">
      <fa-icon icon="fa-solid fa-cart-shopping" /> {{ $store.getters.totalCartPrice }} تومان
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App"
}
</script>
<style>
#cart-container a {
  text-decoration: none;
  color: inherit;
}
#cart-container {
  font-family: "Far Mitra", sans-serif, Helvetica, Arial;
  min-width: 350px;
}
#cart-container #cart-link {
  font-size: 1.3rem;
  transition: tansform 0.1s ease;
}
#cart-container #brand-link {
  font-family: "Mj Joude", sans-serif, Helvetica, Arial;
  font-size: 1.4rem;
  transition: tansform 0.1s ease;
}
#cart-container #brand-link:hover,
#cart-container #cart-link:hover {
  color: rgba(60, 60, 180, 1);
  transform: scale(1.1);
}
</style>