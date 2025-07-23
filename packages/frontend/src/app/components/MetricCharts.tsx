// Aqui a ideia era deixar o gráfico genérico. Poderia ter implementado o title genérico tambem.
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  Cell,
} from "recharts";

interface MetricChartProps {
  data: Array<{
    timestamp: string;
    formattedTime: string;
    temperature: number;
    rpm: number;
    efficiency: number;
  }>;
}
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="text-gray-900 dark:text-gray-100 font-medium mb-2">
          Hora: {label}
        </p>
        {payload.map((entry: any, index: number) => {
          const numericValue = Number(entry.value);
          let value = isNaN(numericValue) ? entry.value : numericValue.toFixed(0);
          let name = entry.name;
          if (name === "formattedTime") return null;
          if (name === "Temperatura") {
            name = "Temperatura (°C)";
          } else if (name === "RPM") {
            name = "RPM";
          } else if (name === "Eficiência") {
            name = "Eficiência (%)";
          }

          return (
            <p 
              key={`tooltip-${index}`} 
              className="text-sm text-gray-600 dark:text-gray-400"
              style={{ color: entry.color }}
            >
              {name}: {value}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};
export function MetricChart({ data }: MetricChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Histórico de Temperatura e RPM
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="formattedTime"
            stroke="#060424"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            stroke="#f97316"
            domain={[0, 100]}
            label={{ value: "°C", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#3b82f6"
            domain={["dataMin - 50", "dataMax + 50"]}
            label={{ value: "RPM", angle: 90, position: "insideRight" }}
          />
<Tooltip content={<CustomTooltip />} />
          <Legend />

          <Line
            yAxisId="left"
            dataKey="temperature"
            name="Temperatura"
            stroke="#f97316"
            dot={false}
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />

          <Line
            yAxisId="right"
            dataKey="rpm"
            name="RPM"
            stroke="#3b82f6"
            dot={false}
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />

          <Scatter
            yAxisId="left"
            name="Eficiência"
            dataKey="efficiency"
            fill="#34D399"
            shape="circle"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#34D399" />
            ))}
          </Scatter>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
