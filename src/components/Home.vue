<template>
    <section class="hero w-100 d-flex flex-column justify-content-center mb-5">
        <div class="hero__body text-white">
            <Transition name="move" appear>
                <div class="container">
                    <h1 class="hero__title h1">علیرضا بیکری</h1>
                    <p class="hero__description lead">با کیفیت ترین نان ها با نازلترین قیمت تحویل  درب منزل</p>
                </div>
            </Transition>
        </div>
    </section>

    <div class="container mb-5" v-if="products.length">
        <div class="row justify-content-start gy-5">
            <div v-for="(product, index) in products" :key="index" class="col-3" id="bread">
                <router-link :to="'products/' + product.name">
                    <div class="card shadow-sm">
                        <img :src="product.img" :alt="product.displayName" class="card-image-top" />
                        <div class="card-body">
                            <div class="cart-title">{{ product.displayName }}</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  async created() {
    await this.$store.dispatch("getProducts");
    this.products = this.$store.state.products;
  },
  data() {
    return {
      products: [],
    }
  }
}
</script>
<style>
@font-face {
  font-family: "Mj Joude";
  src: local("Mj Joude"), url("../assets/fonts/Mj_Joude/Mj_Joude_0.ttf") format("truetype");
}
@font-face {
  font-family: "Far Mitra";
  src: local("Far Mitra"), url("../assets/fonts/Far_Mitra/Far_Mitra.ttf") format("truetype");
}
.hero {
  height: 500px;
  background-image: url("../assets/img/hero-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.hero__body {
  font-family: "Mj Joude", sans-serif, Arial, Helvetica;
  color: #fff;
}
.hero__body .hero__title {
  font-size: 10rem;
}
.hero__body .hero__description {
  font-size: 2rem;
}
.move-enter-from {
  transform: translateY(20px);
  filter: blur(8px);
}
.move-enter-active {
  transition: transform 0.8s ease, filter 0.8s ease;
}
.move-enter-to {
  transform: translateY(0);
  filter: blur(0);
}
#bread .card {
  font-family: "Far Mitra", sans-serif, Arial, Helvetica;
  font-size: 1.4rem;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
}
#bread .card:hover {
  transform: scale(1.05);
}
#bread a {
  text-decoration: none;
  color: inherit;
}
</style>