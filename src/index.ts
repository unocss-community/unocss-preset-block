import type { BlocklistRule } from "@unocss/core";
import { definePreset } from "@unocss/core";

export interface PresetBlockOptions {
  ignores?: BlocklistRule[];
}

function createFilter(selector: string) {
  const filter = (rule: BlocklistRule): boolean => {
    if (typeof rule === "function")
      return rule(selector) ?? false;
    if (typeof rule === "string")
      return selector === rule;
    if (!rule)
      return false;
    if (Array.isArray(rule)) {
      return filter(rule[0]);
    }
    return rule.test(selector);
  };

  return filter;
}

export const presetBlock = definePreset((_options: PresetBlockOptions = {}) => {
  const blockIgnores = _options.ignores ?? [];

  const regexes = [
    /^((p|m|rounded|rd|space|inset)(-?[xyrltb])?|pa|ma|top|bottom|left|right|w|h|min-w|min-h|lh|leading)-?((\.\d+)|(\d+)(\.\d+)?)(rem|px)$/,
    /^text-(size-)?\d$/,
    /\w+--((\.\d+)|(\d+)(\.\d+)?)/,
  ];

  const blockHandler = (selector: string) => {
    if (blockIgnores.some(createFilter(selector)))
      return false;
    return regexes.some(regex => regex.test(selector));
  };

  return {
    name: "unocss-preset-block",
    blocklist: [
      blockHandler,
    ],
  };
});
