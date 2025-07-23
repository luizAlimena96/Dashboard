import { ReactNode } from "react";

export type MetricCardColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type TrendDirection = "up" | "down" | "neutral";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: MetricCardColor;
  trend?: TrendDirection;
  additionalInfo?: string;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

export interface HeaderProps {
  title?: string;
  showOnlineStatus?: boolean;
  className?: string;
  onMenuToggle?: () => void;
}

export interface OnlineStatusIndicatorProps {
  isOnline: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface ThemeToggleButtonProps {
  darkMode: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}
