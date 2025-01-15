import { createGenerator } from "@unocss/core";
import { presetUno } from "unocss";
import { describe, expect, it } from "vitest";
import { presetBlock } from "../src";

function cartesian<T>(arr: T[][]): T[][] {
  return arr.reduce(
    (a, b) => {
      const ret: T[][] = [];
      a.forEach((a) => {
        b.forEach((b) => {
          ret.push(a.concat([b]));
        });
      });
      return ret;
    },
    [[]] as T[][],
  );
}

function createBlockMatcher(uno: Awaited<ReturnType<typeof createGenerator>>) {
  const blocked = new Set<string>();
  const matchBlocked = async (raw: string) => {
    if (blocked.has(raw))
      return;
    if (uno.isBlocked(raw)) {
      blocked.add(raw);
      return;
    }
    let current = raw;
    for (const p of uno.config.preprocess)
      current = p(raw)!;
    const applied = await uno.matchVariants(raw, current);
    if (applied.length) {
      applied
        .filter(r => uno.isBlocked(r[1]))
        .forEach(r => blocked.add(r[0]));
    }
  };
  return async (raw: string, matches: string[]) => {
    const extracts = Array.from(await uno.applyExtractors(raw));
    await Promise.all(extracts.map(matchBlocked));
    return matches.every(m => blocked.has(m));
  };
}

describe("presetBlock", async () => {
  const uno = await createGenerator({
    presets: [
      presetUno(),
      presetBlock({
        ignores: [
          "w-4px",
        ],
      }),
    ],
    blocklist: [
      /block-\d+/,
    ],
  });

  it("disable unit", async () => {
    const dPrefix = ["p", "m", "rounded", "rd", "space", "inset"];
    const udPrefix = ["pa", "ma", "w", "h", "min-w", "min-h", "top", "bottom", "left", "right"];
    const directions = ["x", "y", "l", "t", "b", "r"];

    const prefix = [...cartesian([dPrefix, ["-", ""], directions]).map(r => r.join("")), ...udPrefix];
    const units = ["rem", "px"];
    const numbers = ["1", ".5", "0", "0.23", "-1", "-.5", "-0.23"];
    const list = cartesian([prefix, ["-"], numbers, units]).map(r => r.join(""));
    expect(list.every(l => uno.isBlocked(l))).toBe(true);
  });

  it("ignores", () => {
    // ignore
    expect(uno.isBlocked("w-4px")).toBe(false);
  });

  it("disable continuous negative", () => {
    expect(uno.isBlocked("px--1")).toBe(true);

    expect(uno.isBlocked("-px-1")).toBe(false);
  });

  it("disable magic number", () => {
    expect(uno.isBlocked("text-size-1")).toBe(true);
    expect(uno.isBlocked("text-size-12")).toBe(false);
  });

  it("base blocklist", () => {
    expect(uno.isBlocked("block-1")).toBe(true);
  });

  it("match variants", async () => {
    const matchBlocked = createBlockMatcher(uno);
    const rs = await matchBlocked("!w-100px w-30 p-10 lh-40px", ["!w-100px", "lh-40px"]);
    expect(rs).toBe(true);
  });
});
