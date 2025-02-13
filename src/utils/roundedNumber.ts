import { format } from "d3-format";

export default function roundedNumber(
  number: number | string,
  specifier?: string,
) {
  return format(specifier ?? `,.2f`)(Number(number));
}
