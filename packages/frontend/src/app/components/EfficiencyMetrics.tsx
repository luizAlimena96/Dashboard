import { MachineStatus } from "@/app/components/types/machine";

export const EfficiencyMetrics = ({ oee }: MachineStatus) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-400">
        Métricas de Eficiência
      </h3>
      <div className="space-y-3">
        {[
          { label: "OEE:", value: oee.overall },
          { label: "Disponibilidade:", value: oee.availability },
          { label: "Performance:", value: oee.performance },
          { label: "Qualidade:", value: oee.quality },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex justify-between text-gray-600 dark:text-gray-400"
          >
            <span>{metric.label}</span>
            <span className="font-medium">{metric.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
