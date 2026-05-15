"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ndaVolumeByMonth,
  riskDistribution,
  cycleTimeByType,
} from "@/lib/mockData";

const tooltipStyle = {
  background: "rgba(11,18,36,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 12,
};

export function VolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={ndaVolumeByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="cArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="sArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
        <YAxis stroke="#64748b" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={2} fill="url(#cArea)" name="Created" />
        <Area type="monotone" dataKey="signed" stroke="#22d3ee" strokeWidth={2} fill="url(#sArea)" name="Signed" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RiskPie() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={riskDistribution}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={4}
          stroke="none"
        >
          {riskDistribution.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#cbd5e1" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CycleTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={cycleTimeByType} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="type" stroke="#64748b" fontSize={11} />
        <YAxis stroke="#64748b" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="days" fill="url(#bGrad)" radius={[8, 8, 0, 0]} name="Avg days" />
      </BarChart>
    </ResponsiveContainer>
  );
}
