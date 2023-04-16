<template>
  <section class="hero w-100 d-flex flex-column justify-content-center">
    <div class="hero-body text-white">
      <div class="container">
        <h1 class="h1 title">علیرضا بیکری</h1>
        <p class="lead description">با کیفیت ترین نان ها با نازلترین قیمت تحویل  درب منزل</p>
      </div>
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
.hero-body {
  font-family: "Mj Joude", sans-serif, Arial, Helvetica;
  color: #fff;
}
.hero-body .title {
  font-size: 10rem;
}
.hero-body .description {
  font-size: 2rem;
}
</style>