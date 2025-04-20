"use client";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { NotificationAlertProps } from "@/types";
import { alertStatusConfig } from "@/constants";
import { useEffect, useState } from "react";

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
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          "relative flex items-start gap-3 rounded-md border p-4 shadow-sm min-w-[320px] max-w-[420px]",
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
          onClick={handleClose}
          className={cn(
            "absolute right-2 top-2 rounded-lg p-1",
            "hover:bg-black/5 dark:hover:bg-white/5",
            "transition-colors"
          )}
        >
          <X className="h-4 w-4 opacity-50 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
