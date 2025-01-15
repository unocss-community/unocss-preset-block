import curev from "@curev/eslint-config";
import unocss from "@unocss/eslint-plugin";

export default curev({
}, {
  files: ["*.html", "*.md"],
  plugins: {
    "@unocss": unocss,
  },
  rules: {
    "@unocss/blocklist": ["warn"],
  },
});
