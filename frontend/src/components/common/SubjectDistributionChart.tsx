import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { SubjectDistribution } from "@/types/SubjectDistribution";

const LEVEL_COLORS = {
  gte8: "#16A34A",  
  gte6Lt8: "#2563EB",  
  gte4Lt6: "#D97706",  
  lt4: "#DC2626",    
};

const LEVEL_LABELS = {
  gte8: "Từ 8 trở lên",
  gte6Lt8: "6 - dưới 8",
  gte4Lt6: "4 - dưới 6",
  lt4: "Dưới 4",
};

interface SubjectDistributionChartProps {
  data: SubjectDistribution[];
}

export default function SubjectDistributionChart({ data }: SubjectDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.subject.name,
    gte8: item.gte8,
    gte6Lt8: item.gte6Lt8,
    gte4Lt6: item.gte4Lt6,
    lt4: item.lt4,
  }));

  return (
    <div className="report-page__chart">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e0d9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#52514e" }}
            axisLine={{ stroke: "#c3c2b7" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#898781" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e1e0d9",
              fontSize: 13,
            }}
          />
          <Legend
            formatter={(value) => LEVEL_LABELS[value as keyof typeof LEVEL_LABELS]}
            wrapperStyle={{ fontSize: 13 }}
          />
          <Bar dataKey="gte8" stackId="a" fill={LEVEL_COLORS.gte8} radius={[0, 0, 0, 0]} />
          <Bar dataKey="gte6Lt8" stackId="a" fill={LEVEL_COLORS.gte6Lt8} />
          <Bar dataKey="gte4Lt6" stackId="a" fill={LEVEL_COLORS.gte4Lt6} />
          <Bar dataKey="lt4" stackId="a" fill={LEVEL_COLORS.lt4} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}