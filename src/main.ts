import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@/scss/index.scss';

type ThemeOptions = {};

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'dark' }
});

createApp(App).use(vuetify).mount('#app');
