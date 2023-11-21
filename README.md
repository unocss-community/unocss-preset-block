# unocss-preset-block [![npm](https://img.shields.io/npm/v/unocss-preset-block)](https://npmjs.com/package/unocss-preset-block)

UnoCSS Preset Block.

## Features
- 🔥 Disable non-standard unocss class names 

## Usage
```shell
pnpm i -D unocss-preset-block unocss
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetBlock } from 'unocss-preset-block'

export default defineConfig({
  presets: [
    // ...
    presetBlock(),
  ],
})
```

## Rules
1. Disable px/rem unit
```html
<!-- bad -->
<div class="m-1rem">...</div>
<!-- good -->
<div class="m-4">...</div>
```
2. Disable magic-number
```html
<!-- bad -->
<div class="text-3">...</div>
<!-- good -->
<div class="text-xs">...</div>
```
3. Disable consecutive dashes
```html
<!-- bad -->
<div class="m--3">...</div>
<!-- good -->
<div class="-m-3">...</div>
```


## License

[MIT](./LICENSE) License © 2023 [Chizuki](https://github.com/chizukicn)
