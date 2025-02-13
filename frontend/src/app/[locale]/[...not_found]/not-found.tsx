"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-full flex items-center justify-center bg-background">
      <div className="text-center max-w-md w-full space-y-6">
        <div className="flex justify-center mb-4">
          <AlertCircle
            className="text-destructive"
            size={64}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>

        <p className="text-muted-foreground">{t("description")}</p>

        <Link href="/" className="block">
          <Button variant="default" size="lg" className="w-full">
            {t("homeButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;