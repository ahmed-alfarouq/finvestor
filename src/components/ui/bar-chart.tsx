"use client";

import { useTheme } from "next-themes";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { cn, formatAmount } from "@/lib/utils";

import { BarChartProps } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, datasets, options, className }: BarChartProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const defaultOptions: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: "end",
        position: "top",
        labels: {
          color: isDarkMode ? "#F3F3F3" : "#525256",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        grid: {
          color: isDarkMode ? "#D1D1D1" : "#F3F3F3",
        },
        ticks: {
          color: isDarkMode ? "#f1f1f1" : "#9F9F9F",
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        grid: {
          color: isDarkMode ? "#D1D1D1" : "#299D91",
        },
        ticks: {
          color: isDarkMode ? "#f1f1f1" : "#9F9F9F",
          callback: (value) => {
            return formatAmount(Number(value), true, 0);
          },
        },
      },
    },
  };

  const chartOptions: ChartOptions<"bar"> = {
    ...defaultOptions,
    ...options,
  };

  const chartData = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor:
        dataset.backgroundColor || (isDarkMode ? "#30b6a8" : "#299D91"),
      borderColor: dataset.borderColor || (isDarkMode ? "#30b6a8" : "#299D91"),
      borderRadius: 2,
    })),
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default BarChart;
