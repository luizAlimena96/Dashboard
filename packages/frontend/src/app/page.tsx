// Tentei ao máximo componentizar o dashboard, tentando deixar o código mais limpo e organizado possível.
"use client";
import { useMachineData } from "@/lib/hooks/useMachineData";
import { useMetricHistory } from "@/lib/hooks/useMetricsHistory";
import { Header } from "./components/Header";
import { MetricChart } from "./components/MetricCharts";
import { MetricCard } from "./components/MetricCard";
import { MetricsHeader } from "./components/MetricsHeader";
import { EfficiencyMetrics } from "./components/EfficiencyMetrics";
import { AlertsSection } from "./components/AlertsSection";
import { FiThermometer, FiActivity, FiClock } from "react-icons/fi";
import {
  getStatusText,
  getStatusIcon,
  getStatusColor,
} from "./components/utils/statusUtils";

export default function DashboardPage() {
  const { status, alerts, machineId, alertMachineId } = useMachineData(true);
  const { history } = useMetricHistory(machineId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto p-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <MetricsHeader lastUpdate={status.timestamp} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Estado da Máquina"
              value={getStatusText(status.state)}
              icon={getStatusIcon(status.state)}
              color={getStatusColor(status.state)}
              additionalInfo={`Status: ${
                status.state === "ERROR" ? "Erro detectado" : "Operacional"
              }`}
            />

            <MetricCard
              title="Temperatura"
              value={`${status.metrics.temperature.toFixed(1)}°C`}
              icon={
                <FiThermometer
                  size={20}
                  className="text-orange-500 dark:text-orange-400"
                />
              }
              color={status.metrics.temperature > 80 ? "danger" : "primary"}
              trend={
                status.metrics.temperature > 80
                  ? "up"
                  : status.metrics.temperature < 60
                  ? "down"
                  : "neutral"
              }
              additionalInfo="Máximo seguro: 85°C"
            />

            <MetricCard
              title="Rotação (RPM)"
              value={status.metrics.rpm.toFixed(0)}
              icon={
                <FiActivity
                  size={20}
                  className="text-blue-500 dark:text-blue-400"
                />
              }
              color={status.metrics.rpm < 1100 ? "warning" : "primary"}
              trend={
                status.metrics.rpm < 1100
                  ? "down"
                  : status.metrics.rpm > 1300
                  ? "up"
                  : "neutral"
              }
              additionalInfo="Máximo seguro: 1500 RPM"
            />

            <MetricCard
              title="Tempo de Operação"
              value={`${Math.floor(status.metrics.uptime / 3600)}h ${Math.floor(
                (status.metrics.uptime % 3600) / 60
              )}m`}
              icon={
                <FiClock
                  size={20}
                  className="text-indigo-500 dark:text-indigo-400"
                />
              }
              color="info"
              additionalInfo={`${Math.floor(
                status.metrics.uptime / 86400
              )} dias de operação`}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <MetricChart data={history} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsSection
            visibleAlerts={alerts}
            machineId={machineId}
            alertMachineId={alertMachineId}
          />
          <EfficiencyMetrics
            oee={status.oee}
            id={""}
            timestamp={undefined}
            state={"RUNNING"}
            metrics={{
              temperature: 0,
              rpm: 0,
              uptime: 0,
              efficiency: 0,
            }}
          />
        </div>
      </main>
    </div>
  );
}
