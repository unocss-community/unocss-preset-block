import type { BlocklistRule } from '@unocss/core'
import { definePreset } from '@unocss/core'

export interface PresetBlockOptions {
  ignores?: BlocklistRule[]
}

function createFilter(selector: string) {
  return (rule: RegExp | string | undefined | null | ((raw: string) => boolean | undefined | null)) => {
    if (typeof rule === 'function')
      return rule(selector)
    if (typeof rule === 'string')
      return selector === rule
    if (!rule)
      return false

    return rule.test(selector)
  }
}

export const presetBlock = definePreset((_options: PresetBlockOptions = {}) => {
  const blockIgnores = _options.ignores ?? []

  const regexes = [
    /^((p|m|rounded|rd|space|inset)(-?[xyrltb])?|pa|ma|top|bottom|left|right|w|h|min-w|min-h|lh|leading)-?((\.\d+)|(\d+)(\.\d+)?)(rem|px)$/,
    /^text-(size-)?[0-9]$/,
    /\w+--((\.\d+)|(\d+)(\.\d+)?)/,
  ]

  const blockHandler = (selector: string) => {
    if (blockIgnores.some(createFilter(selector)))
      return false
    return regexes.some(regex => regex.test(selector))
  }

  return {
    name: 'unocss-preset-block',
    blocklist: [
      blockHandler,
    ],
  }
})
