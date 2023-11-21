import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu({
}, {
  files: ['*.html', '*.md'],
  plugins: {
    '@unocss': unocss,
  },
  rules: {
    '@unocss/blocklist': ['warn'],
  },
})
