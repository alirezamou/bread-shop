import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faIcons, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faIcons, faPlus);

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);

app.use(router);

app.use(store);

app.mount("#app");
