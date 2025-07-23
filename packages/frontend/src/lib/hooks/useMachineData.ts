"use client";
import useSWR from "swr";
import { fetchMachineStatus, fetchMachineAlerts } from "@/lib/api";
import { Alert } from "@/app/components/types/alert";
import { MachineStatus } from "@/app/components/types/machine";
import { useEffect, useState, useCallback, useRef } from "react";

const DEFAULT_MACHINE_STATE: MachineStatus = {
  id: "loading",
  timestamp: new Date(),
  state: "MAINTENANCE",
  metrics: {
    temperature: 0,
    rpm: 0,
    uptime: 0,
    efficiency: 0,
  },
  oee: {
    overall: 0,
    availability: 0,
    performance: 0,
    quality: 0,
  },
};

export function useMachineData(
  autoRotate: boolean = false,
  rotationInterval: number = 5000,
  visibleAlertsCount: number = 2
) {
  const [machineIds] = useState<string[]>(
    Array.from({ length: 120 }, (_, i) => (i + 1).toString())
  );
  const [currentIndex, setCurrentIndex] = useState(28);
  const [machineId, setMachineId] = useState<string>(machineIds[28]);

  const [currentAlertIndex, setCurrentAlertIndex] = useState(28);
  const [alertMachineId, setAlertMachineId] = useState<string>(machineIds[28]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const alertIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const swrOptions = {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    keepPreviousData: true,
    dedupingInterval: 1500,
  };

  const {
    data: allStatusData = [],
    error: statusError,
    isLoading: statusLoading,
    mutate: mutateStatus,
  } = useSWR<MachineStatus[]>("machineStatus", fetchMachineStatus, swrOptions);

  const {
    data: allAlerts = [],
    error: alertsError,
    isLoading: alertsLoading,
    mutate: mutateAlerts,
  } = useSWR<Alert[]>(
    ["machineAlerts", alertMachineId],
    () => fetchMachineAlerts(alertMachineId),
    swrOptions
  );

  const getVisibleAlerts = useCallback(() => {
    if (!allAlerts || allAlerts.length === 0) return [];

    const startIndex = parseInt(machineId) % allAlerts.length;
    const visibleAlerts = [];

    for (let i = 0; i < visibleAlertsCount; i++) {
      const index = (startIndex + i) % allAlerts.length;
      visibleAlerts.push(allAlerts[index]);
    }

    return visibleAlerts;
  }, [allAlerts, machineId, visibleAlertsCount]);

  const visibleAlerts = getVisibleAlerts();
  const currentStatus = allStatusData.find(
    (status) => status.id === machineId
  ) || { ...DEFAULT_MACHINE_STATE, id: machineId };

  const rotateToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % machineIds.length;
      setMachineId(machineIds[newIndex]);
      return newIndex;
    });
  }, [machineIds]);

  const rotateToNextAlert = useCallback(() => {
    setCurrentAlertIndex((prev) => {
      const newIndex = (prev + 1) % machineIds.length;
      setAlertMachineId(machineIds[newIndex]);
      return newIndex;
    });
  }, [machineIds]);

  const clearIntervals = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    alertIntervalRef.current && clearInterval(alertIntervalRef.current);
  }, []);

  const startIntervals = useCallback(() => {
    clearIntervals();
    if (autoRotate) {
      intervalRef.current = setInterval(rotateToNext, rotationInterval);
      alertIntervalRef.current = setInterval(rotateToNextAlert, 5000);
    }
  }, [
    autoRotate,
    rotateToNext,
    rotateToNextAlert,
    rotationInterval,
    clearIntervals,
  ]);

  useEffect(() => {
    startIntervals();
    return clearIntervals;
  }, [startIntervals, clearIntervals]);

  const refresh = useCallback(() => {
    mutateStatus();
    mutateAlerts();
  }, [mutateStatus, mutateAlerts]);

  return {
    status: currentStatus,
    alerts: visibleAlerts,
    allAlerts,
    isLoading: statusLoading || alertsLoading,
    error: statusError?.message || alertsError?.message || null,
    machineId,
    alertMachineId,
    refresh,
    currentAlertIndex,
    allMachinesStatus: allStatusData,
    rotateToNext,
    getVisibleAlerts,
  };
}
