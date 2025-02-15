"use client";

import { TooltipContainer, TooltipValueTitle } from "@/app/_components/chart";
import { type AppRouterOutput } from "@/server/api/root";
import roundedNumber from "@/utils/roundedNumber";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { type ValueType } from "recharts/types/component/DefaultTooltipContent";
import { type NameType } from "recharts/types/component/DefaultTooltipContent";
import { type DataKey } from "recharts/types/util/types";

type TitleOccurrencesBarChartData =
  AppRouterOutput["search"]["countsTitles"]["titles"][number];

export const TitleOccurrencesBarChart = ({
  data,
}: {
  data: TitleOccurrencesBarChartData[];
}) => {
  return <SingleBarChart data={data} dataKey="count" xAxisDataKey="title" />;
};

export const SingleBarChart = ({
  data,
  dataKey,
  xAxisDataKey,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: DataKey<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  xAxisDataKey: string;
  children?: React.ReactNode;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart width={500} height={300} data={data}>
        <defs>
          <linearGradient id="barGradient" x1="2" y1="2" x2="0" y2="0">
            <stop offset="40%" stopColor="#3417ff" stopOpacity={0.7} />
            <stop offset="99%" stopColor="#1a0e6e" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <Tooltip
          cursor={{ fill: "#0f264d" }}
          content={<TitleOccurrencesBarChartTooltip />}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#474747"
          strokeOpacity={0.5}
          strokeLinecap="butt"
        />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tick={{ dy: 5, fill: "#999999" }}
        />
        <YAxis tick={{ fontWeight: "600", fill: "#999999" }} tickLine={false} />
        <Bar dataKey={dataKey} fill="url(#barGradient)" maxBarSize={200} />
        {children}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

const TitleOccurrencesBarChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0 && payload[0]?.payload) {
    const { count } = payload[0].payload as TitleOccurrencesBarChartData;

    return (
      <TooltipContainer>
        <TooltipValueTitle
          value={roundedNumber(count ?? 0, ",.0f")}
          title="Occurrences"
        />
        <p className="font-semibold">Title {label}</p>
      </TooltipContainer>
    );
  }

  return null;
};
