export * from "./shapes";
export * from "./types";

export function clamp(n: number, lb: number, ub: number) {
  if (n < lb) return lb;
  if (n > ub) return ub;
  return n;
}
