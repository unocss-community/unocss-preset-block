import { defineConfig, presetUno } from "unocss";
import { presetBlock } from "./src";

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetBlock(),
  ],
});
