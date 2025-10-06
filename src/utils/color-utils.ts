// src/utils/color-utils.ts
import * as culori from "culori";

export function isOklch(value: string): boolean {
  return value.startsWith("oklch(") && value.endsWith(")");
}

export function isName(value: string): boolean {
  return culori.parse(value.trim()) !== undefined;
}

// Colors like white -> #ffffff
export function convertNameToHex(value: string): string {
  const color = culori.parse(value.trim());
  if (!color) throw new Error(`${value} is not a valid color`);
  return culori.formatHex(color);
}

export function convertOklchToHex(value: string): string {
  try {
    // Parse OKLCH → internal color object
    const color = culori.parse(value.trim());
    if (!color) return value; // return original if not parsable
    return culori.formatHex(color); // → "#RRGGBB"
  } catch {
    return value;
  }
}
