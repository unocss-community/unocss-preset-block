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
import { defineConfig } from "unocss";
import { presetBlock } from "unocss-preset-block";

export default defineConfig({
  presets: [
    // ...
    presetBlock(),
  ],
});
```

## Rules
Disable px/rem unit
```html
<!-- bad -->
<div class="m-1rem">...</div>
<!-- good -->
<div class="m-4">...</div>
```
Disable magic-number
```html
<!-- bad -->
<div class="text-3">...</div>
<!-- good -->
<div class="text-xs">...</div>
```
Disable consecutive dashes
```html
<!-- bad -->
<div class="m--3">...</div>
<!-- good -->
<div class="-m-3">...</div>
```

## Lint
Recommended to work with [@unocss/eslint-plugin](https://github.com/unocss/unocss/tree/main/packages/eslint-plugin)

```js
// .eslintrc.js
module.exports = {
  plugins: [
    // ...
    "@unocss",
  ],
  rules: {
    // ...
    "@unocss/blocklist": ["error"]
  },
};
```

## License

[MIT](./LICENSE) License © 2023 [Chizuki](https://github.com/chizukicn)
