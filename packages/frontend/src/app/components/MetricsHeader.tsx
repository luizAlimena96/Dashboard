import { format } from "date-fns";

interface MetricsHeaderProps {
  lastUpdate: Date;
}

export const MetricsHeader = ({ lastUpdate }: MetricsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Métricas em Tempo Real
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Monitoramento contínuo dos equipamentos industriais
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Última atualização
        </p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {format(new Date(lastUpdate), "HH:mm:ss")}
        </p>
      </div>
    </div>
  );
};
