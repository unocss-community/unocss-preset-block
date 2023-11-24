import type { BlocklistRule } from '@unocss/core'
import { definePreset } from '@unocss/core'

export interface PresetBlockOptions {
  ignores?: BlocklistRule[]
}

export const presetBlock = definePreset((_options: PresetBlockOptions = {}) => {
  const blockIgnores = _options.ignores ?? []
  const createFilter = (selector: string) => {
    return (rule: BlocklistRule) => {
      if (typeof rule === 'function')
        return rule(selector)
      return !!selector.match(rule)
    }
  }

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
