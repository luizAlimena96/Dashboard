import { useEffect, useState } from "react";

export const DataStatusIndicator = ({
  lastUpdated,
}: {
  lastUpdated: Date | null;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!lastUpdated) return;

    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 1000);

    return () => clearTimeout(timer);
  }, [lastUpdated]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Última atualização:{" "}
        {lastUpdated?.toLocaleTimeString("pt-BR") || "Nunca"}
      </span>
      {isUpdating && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      )}
    </div>
  );
};
