import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VBtn: { color: 'primary' },
      VTextField: { variant: 'outlined', density: 'compact', hideDetails: '' },
      VSelect: { variant: 'outlined', density: 'compact', hideDetails: '' },
      VTextarea: { variant: 'outlined', density: 'compact', hideDetails: '' },
      VAutocomplete: { variant: 'outlined', density: 'compact', hideDetails: '' }
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#056839',
            secondary: '#615f67',
            error: '#DE3730'
          }
        }
      }
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
