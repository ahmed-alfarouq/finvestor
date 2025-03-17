import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";

import { handleGoogleLogin } from "@/actions/login";

interface CardWrapperProps {
  children: React.ReactNode;
  logo: string;
  headerLabel?: string;
  headerText?: string;
  backLinkText: string;
  backLinkHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  logo,
  headerLabel,
  headerText,
  backLinkText,
  backLinkHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-none w-full sm:w-[400] border-none">
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
        {showSocial && (
          <>
            <div className="text-gray-7 dark:text-primary-dark text-sm text-center relative before:absolute before:bottom-[9px] before:-left-28 before:h-[1px] before:w-24 before:bg-third-color before:opacity-25 after:absolute after:bottom-[9px] after:-right-28 after:h-[1px] after:w-24 after:bg-third-color after:opacity-25">
              Or signin with
            </div>
            <form action={handleGoogleLogin} className="w-full">
              <Button
                type="submit"
                variant="secondary"
                className="flex w-full text-sm capitalize"
                size="lg"
              >
                <FcGoogle size={24} />
                continue with google
              </Button>
            </form>
          </>
        )}
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
