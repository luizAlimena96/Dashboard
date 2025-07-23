"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiWifi, FiWifiOff } from "react-icons/fi";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Header: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const updateOnlineStatus = (): void => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!mounted) {
    return (
      <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md transition-colors duration-200">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            Dashboard de Monitoramento
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-8 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </header>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo do Dashboard Industrial"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <h1 className="text-xl font-bold tracking-tight">
          Dashboard de Monitoramento
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
          aria-label={
            isDarkMode
              ? "Alternar para modo claro"
              : "Alternar para modo escuro"
          }
          title={isDarkMode ? "Modo claro" : "Modo escuro"}
        >
          {isDarkMode ? (
            <FiSun className="text-yellow-300 w-5 h-5" />
          ) : (
            <FiMoon className="text-gray-300 w-5 h-5" />
          )}
        </button>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-200 ${
            isOnline
              ? "bg-green-900/20 border border-green-500/20"
              : "bg-red-900/20 border border-red-500/20"
          }`}
        >
          {isOnline ? (
            <FiWifi className="text-green-400" />
          ) : (
            <FiWifiOff className="text-red-400" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <button>Configuração</button>
      </div>
    </header>
  );
};
