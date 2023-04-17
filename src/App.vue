<template>
  <section class="hero w-100 d-flex flex-column justify-content-center">
    <div class="hero__body text-white">
      <Transition name="move" appear>
        <div class="container">
          <h1 class="hero__title h1">علیرضا بیکری</h1>
          <p class="hero__description lead">با کیفیت ترین نان ها با نازلترین قیمت تحویل  درب منزل</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script>
</script>
<style>
@font-face {
  font-family: "Mj Joude";
  src: local("Mj Joude"), url("./assets/fonts/Mj_Joude/Mj_Joude_0.ttf") format("truetype");
}
.hero {
  height: 500px;
  background-image: url("./assets/img/hero-background.jpg");
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
</style>