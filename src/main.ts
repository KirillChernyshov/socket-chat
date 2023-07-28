import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import { initEvents } from '@/api';

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');

initEvents();
