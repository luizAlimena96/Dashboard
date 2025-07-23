//Aqui a ideia era deixar o card genérico.
"use client";

import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";
import { JSX } from "react";
import {
  MetricCardColor,
  TrendDirection,
  MetricCardProps,
} from "./types/components";

const colorMap: Record<
  MetricCardColor,
  { bg: string; border: string; text: string }
> = {
  primary: {
    bg: "bg-blue-50 dark:bg-blue-900/40",
    border: "border-blue-200 dark:border-blue-700",
    text: "text-blue-700 dark:text-blue-200",
  },
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-900/40",
    border: "border-emerald-200 dark:border-emerald-700",
    text: "text-emerald-700 dark:text-emerald-200",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-900/40",
    border: "border-amber-200 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-200",
  },
  danger: {
    bg: "bg-rose-50 dark:bg-rose-900/40",
    border: "border-rose-200 dark:border-rose-700",
    text: "text-rose-700 dark:text-rose-200",
  },
  info: {
    bg: "bg-sky-50 dark:bg-sky-900/40",
    border: "border-sky-200 dark:border-sky-700",
    text: "text-sky-700 dark:text-sky-200",
  },
};

const getTrendIcon = (trend: TrendDirection): JSX.Element => {
  const iconProps = { size: 16, className: "inline-block ml-1" };

  switch (trend) {
    case "up":
      return (
        <FiTrendingUp
          {...iconProps}
          className={`${iconProps.className} text-green-500 dark:text-green-400`}
        />
      );
    case "down":
      return (
        <FiTrendingDown
          {...iconProps}
          className={`${iconProps.className} text-rose-500 dark:text-rose-400`}
        />
      );
    case "neutral":
      return (
        <FiMinus
          {...iconProps}
          className={`${iconProps.className} text-gray-500 dark:text-gray-400`}
        />
      );
    default:
      return <></>;
  }
};

const LoadingSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color = "primary",
  trend,
  additionalInfo,
  className = "",
  onClick,
  loading = false,
}) => {
  if (loading) return <LoadingSkeleton />;

  const colors = colorMap[color];
  const cardClasses = `
    rounded-lg shadow-sm border ${colors.border} ${colors.bg}
    p-6 transition-all duration-200
    ${
      onClick
        ? "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        : ""
    }
    ${className}
  `.trim();

  const CardContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-sm font-medium uppercase tracking-wide ${colors.text}`}
        >
          {title}
        </h3>
        {icon && <div className="flex-shrink-0">{icon}</div>}
      </div>

      <div className="mb-2">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </span>
          {trend && getTrendIcon(trend)}
        </div>
      </div>
      {additionalInfo && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {additionalInfo}
        </p>
      )}
    </>
  );

  return onClick ? (
    <button
      className={cardClasses}
      onClick={onClick}
      type="button"
      aria-label={`Métrica: ${title} - ${value}`}
    >
      <CardContent />
    </button>
  ) : (
    <div className={cardClasses}>
      <CardContent />
    </div>
  );
};
interface MetricCardWithChartProps extends MetricCardProps {
  chartData?: number[];
  chartColor?: string;
}
export const MetricCardWithChart: React.FC<MetricCardWithChartProps> = ({
  chartData = [],
  chartColor = "#3B82F6",
  ...props
}) => {
  const maxValue = Math.max(...chartData, 1);

  return (
    <div className="space-y-4">
      <MetricCard {...props} />
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Histórico (últimos {chartData.length} pontos)
          </h4>
          <div className="flex items-end space-x-1 h-16">
            {chartData.map((value, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-sm transition-all duration-300"
                style={{
                  backgroundColor: chartColor,
                  height: `${(value / maxValue) * 100}%`,
                  minHeight: "2px",
                  opacity: 0.6 + (index / chartData.length) * 0.4,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
