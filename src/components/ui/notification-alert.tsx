"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

import { NotificationAlertProps } from "@/types";

const alertStatusConfig = {
  info: {
    icon: Info,
    styles: "bg-blue-50 border border-blue-100 text-blue-600",
    darkStyles: "dark:bg-blue-950 dark:border-blue-900 dark:text-blue-400",
    iconColor: "text-blue-500 dark:text-blue-400",
    barStyle: "bg-blue-500 dark:bg-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    styles: "bg-amber-50 border border-amber-100 text-amber-600",
    darkStyles: "dark:bg-amber-950 dark:border-amber-900 dark:text-amber-400",
    iconColor: "text-amber-500 dark:text-amber-400",
    barStyle: "bg-amber-500 dark:bg-amber-400",
  },
  error: {
    icon: AlertCircle,
    styles: "bg-red-50 border border-red-100 text-red-600",
    darkStyles: "dark:bg-red-950 dark:border-red-900 dark:text-red-400",
    iconColor: "text-red-500 dark:text-red-400",
    barStyle: "bg-red-500 dark:bg-red-400",
  },
  success: {
    icon: CheckCircle2,
    styles: "bg-green-50 border border-green-100 text-green-600",
    darkStyles: "dark:bg-green-950 dark:border-green-900 dark:text-green-400",
    iconColor: "text-green-500 dark:text-green-400",
    barStyle: "bg-green-500 dark:bg-green-400",
  },
};

export function NotificationAlert({
  title,
  message,
  status = "info",
  onClose = () => {},
  duration = 5000,
}: NotificationAlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const config = alertStatusConfig[status];
  const StatusIcon = config.icon;

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          "relative flex items-start gap-3 rounded-md border px-4 py-6 shadow-sm min-w-[320px] max-w-[420px]",
          "transition-all duration-300 ease-in-out",
          "animate-in fade-in slide-in-from-top-4",
          isLeaving && "animate-out fade-out slide-out-to-top-4",
          config.styles,
          config.darkStyles
        )}
      >
        <StatusIcon className={cn("h-5 w-5 mt-0.5", config.iconColor)} />

        <div className="flex-1 space-y-1">
          <h3 className="font-medium">
            {status.charAt(0).toUpperCase() + status.slice(1)}: {title}
          </h3>
          <p className="text-sm opacity-90">{message}</p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4 opacity-50 hover:opacity-100" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-md">
          <div
            className={cn("h-full", config.barStyle)}
            style={{
              width: "100%",
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
