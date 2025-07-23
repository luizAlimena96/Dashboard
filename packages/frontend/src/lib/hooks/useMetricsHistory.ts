// Aqui eu tentei simular a entrada de dados reais de uma máquina acredito que 24 valores ficou bom, 
// com mais valores o index do eixo x ficou muito amontoado, seguindo a mesma ideia do useMachineData,
// acredito que seria mais fácil se eu tivesse criado o backend para ir gerando valores.

"use client";
import useSWR from "swr";
import { fetchMachineMetrics } from "@/lib/api";
import { MetricHistory } from "@/app/components/types/metricHistory";
import { useEffect, useState, useCallback, useRef } from "react";

interface FormattedMetricHistory {
  timestamp: string;
  formattedTime: string;
  temperature: number;
  rpm: number;
}

export const useMetricHistory = (
  machineId: string = "1",
  limit: number = 24,
  initialOffset: number = 0
) => {
  const [windowData, setWindowData] = useState<FormattedMetricHistory[]>([]);
  const currentOffset = useRef(initialOffset);
  const dataCache = useRef<FormattedMetricHistory[]>([]);

  const formatData = useCallback(
    (data: MetricHistory[]): FormattedMetricHistory[] => {
      if (!data) return [];
      return data.map((item) => ({
        timestamp:
          typeof item.timestamp === "string"
            ? item.timestamp
            : item.timestamp.toISOString(),
        formattedTime: new Date(item.timestamp).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        efficiency: Number(item.efficiency.toFixed(2)),
        temperature: Number(item.temperature.toFixed(1)),
        rpm: Number(item.rpm.toFixed(0)),
      }));
    },
    []
  );
  const { data, error, isLoading } = useSWR<MetricHistory[]>(
    ["machineMetrics", machineId, initialOffset],
    () => fetchMachineMetrics(machineId, limit, initialOffset),
    {
      revalidateOnFocus: false,
      refreshInterval: 2000,
      dedupingInterval: 1500,
      onSuccess: (newData) => {
        const formattedNewData = formatData(newData || []);
        if (formattedNewData.length > 0) {
          dataCache.current = formattedNewData;
          updateWindowData();
        }
      },
    }
  );

  const updateWindowData = useCallback(() => {
    if (dataCache.current.length === 0) return;

    // Cria a janela de dados baseada no offset atual
    const endIndex = Math.min(
      currentOffset.current + limit,
      dataCache.current.length
    );
    const newWindowData = dataCache.current.slice(
      currentOffset.current,
      endIndex
    );

    // Se precisar, volta ao início do array
    if (newWindowData.length < limit) {
      newWindowData.push(
        ...dataCache.current.slice(0, limit - newWindowData.length)
      );
    }

    setWindowData(newWindowData);
  }, [limit]);

  // Avança o offset automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (dataCache.current.length === 0) return;

      currentOffset.current =
        (currentOffset.current + 1) % dataCache.current.length;
      updateWindowData();
    }, 2000);

    return () => clearInterval(interval);
  }, [updateWindowData]);

  return {
    history: windowData,
    error,
    loading: isLoading,
    reset: () => {
      currentOffset.current = initialOffset;
      updateWindowData();
    },
    currentOffset: currentOffset.current,
  };
};
