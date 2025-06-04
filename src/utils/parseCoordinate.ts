export function parseCoordinate(value?: string | number | null): number | null {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "N/A"
  ) {
    return null;
  }
  const num =
    typeof value === "string"
      ? parseFloat(value)
      : typeof value === "number"
        ? value
        : NaN;
  return isFinite(num) ? num : null;
}
