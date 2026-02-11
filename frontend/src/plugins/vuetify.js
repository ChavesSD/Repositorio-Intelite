import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'githubDark',
    themes: {
      githubDark: {
        dark: true,
        colors: {
          background: '#0d1117',
          surface: '#161b22',
          'surface-bright': '#21262d',
          'surface-variant': '#21262d',
          'on-surface': '#c9d1d9',
          'on-surface-variant': '#8b949e',
          primary: '#58a6ff',
          'on-primary': '#ffffff',
          secondary: '#388bfd',
          outline: '#30363d',
          error: '#f85149',
          success: '#3fb950',
          'on-background': '#c9d1d9',
        },
      },
    },
  },
})

