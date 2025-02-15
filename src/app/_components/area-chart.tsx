"use client";

import roundedNumber from "@/utils/roundedNumber";
import {
  Area,
  AreaChart as ReAreaChat,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { type DataKey } from "recharts/types/util/types";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipContainer, TooltipValueTitle } from "@/app/_components/chart";

type ChangeLogChartData = {
  formattedDate: string;
  count: number;
};

export const ChangeLogAreaChart = ({
  data,
}: {
  data: ChangeLogChartData[];
}) => {
  return (
    <AreaChart data={data} dataKey="count" xAxisDataKey="formattedDate">
      <Tooltip content={<ChangeLogAreaChartTooltip />} />
    </AreaChart>
  );
};

const ChangeLogAreaChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0 && payload[0]?.payload) {
    const { count } = payload[0].payload as ChangeLogChartData;

    return (
      <TooltipContainer>
        <TooltipValueTitle
          value={roundedNumber(count ?? 0, ",.0f")}
          title="Changes"
        />
        {label}
      </TooltipContainer>
    );
  }

  return null;
};

export const AreaChart = ({
  data,
  dataKey,
  xAxisDataKey,
  children,
  domain,
  isAnimationActive,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: DataKey<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  xAxisDataKey: string;
  children?: React.ReactNode;
  domain?: number[];
  isAnimationActive?: boolean;
  className?: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <ReAreaChat
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="2" y1="2" x2="0" y2="0">
            <stop offset="40%" stopColor="#3417ff" stopOpacity={0.7} />
            <stop offset="99%" stopColor="#1a0e6e" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#5f6369"
          strokeOpacity={0.7}
          strokeLinecap="butt"
        />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tick={{ dy: 5, fill: "#999999" }}
        />
        <YAxis
          domain={domain}
          tick={{ fontWeight: "600", fill: "#999999" }}
          tickLine={false}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#035fff"
          fill="url(#areaGradient)"
          strokeWidth={2}
          isAnimationActive={isAnimationActive ?? true}
        />
        {children}
      </ReAreaChat>
    </ResponsiveContainer>
  );
};
