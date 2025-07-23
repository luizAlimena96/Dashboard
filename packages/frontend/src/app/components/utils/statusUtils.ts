import React from "react";
import {
  FiThermometer,
  FiActivity,
  FiClock,
  FiPower,
  FiTool,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

export type MachineState = "RUNNING" | "STOPPED" | "MAINTENANCE" | "ERROR";
export type StatusColor = "success" | "info" | "warning" | "danger" | "primary";
export type AlertLevel = "INFO" | "WARNING" | "CRITICAL";

export const getStatusText = (state: MachineState): string => {
  switch (state) {
    case "RUNNING":
      return "Ligada";
    case "STOPPED":
      return "Desligada";
    case "MAINTENANCE":
      return "Manutenção";
    case "ERROR":
      return "Erro";
    default:
      return "";
  }
};

export const getStatusColor = (state: MachineState): StatusColor => {
  switch (state) {
    case "RUNNING":
      return "success";
    case "STOPPED":
      return "info";
    case "MAINTENANCE":
      return "warning";
    case "ERROR":
      return "danger";
    default:
      return "primary";
  }
};

export const getStatusIcon = (state: MachineState): React.ReactElement => {
  const iconSize = 20;

  switch (state) {
    case "RUNNING":
      return React.createElement(FiPower, {
        className: "text-green-500 dark:text-green-400",
        size: iconSize,
      });
    case "STOPPED":
      return React.createElement(FiPower, {
        className: "text-blue-500 dark:text-blue-400",
        size: iconSize,
      });
    case "MAINTENANCE":
      return React.createElement(FiTool, {
        className: "text-yellow-500 dark:text-yellow-400",
        size: iconSize,
      });
    case "ERROR":
      return React.createElement(FiAlertTriangle, {
        className: "text-red-500 dark:text-red-400",
        size: iconSize,
      });
    default:
      return React.createElement(FiPower, {
        className: "text-gray-500 dark:text-gray-400",
        size: iconSize,
      });
  }
};

export const getAlertIcon = (level: AlertLevel): React.ReactElement => {
  const iconSize = 16;

  switch (level) {
    case "INFO":
      return React.createElement(FiInfo, {
        className: "text-blue-500",
        size: iconSize,
      });
    case "WARNING":
      return React.createElement(FiAlertTriangle, {
        className: "text-yellow-500",
        size: iconSize,
      });
    case "CRITICAL":
      return React.createElement(FiAlertTriangle, {
        className: "text-red-500",
        size: iconSize,
      });
    default:
      return React.createElement(FiInfo, {
        className: "text-gray-500",
        size: iconSize,
      });
  }
};
