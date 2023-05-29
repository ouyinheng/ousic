import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import naive from "naive-ui";
import axios from "axios";

import "@/assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);
app.provide("$axios", axios);
app.mount("#app");
