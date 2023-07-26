import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VBtn, VCard, VColorPicker, VForm, VTextField } from 'vuetify/components';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    VBtn,
    VCard,
    VColorPicker,
    VForm,
    VTextField,
  },
  directives: {},
});
