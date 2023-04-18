import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap";
import "./assets/main.css";

const app = createApp(App);

import fontawesomePlugin from "./plugins/packages/fontawesome";
fontawesomePlugin(app);

app.use(router);

app.use(store);

app.mount("#app");
