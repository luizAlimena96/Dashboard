import { format } from "date-fns";
import { getAlertIcon } from "./utils/statusUtils";
import { Alert } from "./types/alert";
import { useEffect, useRef } from "react";

interface AlertsSectionProps {
  visibleAlerts: Alert[];
  machineId: string;
  alertMachineId: string;
}

const alertSounds = {
  CRITICAL: "/critical-alert.mp3",
  WARNING: "/warning-alert.mp3",
  INFO: null,
};

const sortAlertsBySeverity = (alerts: Alert[]): Alert[] => {
  const severityOrder = { CRITICAL: 1, WARNING: 2, INFO: 3 };
  return [...alerts].sort(
    (a, b) => severityOrder[a.level] - severityOrder[b.level]
  );
};

export const AlertsSection = ({
  visibleAlerts,
  alertMachineId,
}: AlertsSectionProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedAlerts = useRef<Set<string>>(new Set());
  const sortedAlerts = sortAlertsBySeverity(visibleAlerts);

  useEffect(() => {
    const newCriticalOrWarningAlerts = sortedAlerts.filter(
      (alert) =>
        (alert.level === "CRITICAL" || alert.level === "WARNING") &&
        !lastPlayedAlerts.current.has(alert.id)
    );

    if (newCriticalOrWarningAlerts.length > 0) {
      const highestSeverityAlert = newCriticalOrWarningAlerts.reduce(
        (prev, current) => (prev.level === "CRITICAL" ? prev : current)
      );

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const soundToPlay = alertSounds[highestSeverityAlert.level];
      if (soundToPlay) {
        const audio = new Audio(soundToPlay);
        audioRef.current = audio;
        audio.play().catch(console.error);

        if (highestSeverityAlert.level === "CRITICAL") {
          const timer = setTimeout(() => {}, 3000);

          return () => clearTimeout(timer);
        }
      }

      newCriticalOrWarningAlerts.forEach((alert) => {
        lastPlayedAlerts.current.add(alert.id);
      });
    }

    const visibleAlertIds = new Set(visibleAlerts.map((a) => a.id));
    lastPlayedAlerts.current.forEach((id) => {
      if (!visibleAlertIds.has(id)) {
        lastPlayedAlerts.current.delete(id);
      }
    });
  }, [sortedAlerts, visibleAlerts]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-400">
        Alertas Recentes{" "}
        {visibleAlerts.length > 0 && `(${visibleAlerts.length} ativos)`}
      </h3>
      <audio ref={audioRef} />
      <div className="space-y-3">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <div
              key={`${alertMachineId}-${alert.id}`}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                alert.level === "CRITICAL"
                  ? "bg-red-50 dark:bg-red-900/30"
                  : alert.level === "WARNING"
                  ? "bg-yellow-50 dark:bg-yellow-900/30"
                  : "bg-blue-50 dark:bg-blue-900/30"
              }`}
            >
              {getAlertIcon(alert.level)}
              <div className="flex-1">
                <p className="font-medium text-gray-600 dark:text-gray-400">
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(alert.timestamp), "HH:mm:ss")} •{" "}
                  {alert.component}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-green-600 dark:text-green-400 text-sm">
            ✓ Nenhum alerta ativo para máquina {alertMachineId}
          </div>
        )}
      </div>
    </div>
  );
};
