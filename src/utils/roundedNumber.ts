import { format } from "d3-format";

export default function roundedNumber(
  number: number | string,
  specifier?: string,
): string {
  const num = Number(number);

  if (isNaN(num) || !isFinite(num)) {
    return "0";
  }

  return format(specifier ?? `,.2f`)(num);
}
