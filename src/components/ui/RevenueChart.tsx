"use client";

import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  revenue: number;
  orders: number;
}

interface Props {
  data: ChartData[];
}

export default function RevenueChart({ data }: Props) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border shadow-lg p-3">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Revenue: <span className="font-semibold text-primary">${payload[0].value.toFixed(2)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Orders: <span className="font-semibold">{payload[1]?.value || 0}</span>
          </p>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearlinear id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearlinear>
            <linearlinear id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
            </linearlinear>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground)/0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#22c55e"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: "#22c55e" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}