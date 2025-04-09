import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { FormCardWrapperProps } from "@/types";

const CardWrapper = ({
  children,
  logo,
  headerLabel,
  headerText,
  backLinkText,
  backLinkHref,
}: FormCardWrapperProps) => {
  return (
    <Card className="shadow-none w-full sm:w-[550px] border-none">
      <CardHeader className="gap-2">
        <Image
          src={logo}
          alt="logo"
          aria-hidden="true"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-primary-color dark:text-primary-color-dark font-bold text-2xl text-center">
          {headerLabel}
        </h1>
        <p className="text-lg text-gray-1 dark:text-gray-4 text-center">{headerText}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter className="flex-col gap-7">
        <Link
          href={backLinkHref}
          className="text-primary dark:text-primary-dark"
        >
          {backLinkText}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
