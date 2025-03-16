"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserByEmail } from "@/lib/getUserFromDb";
import {
  getVerificationTokenByToken,
  removeEmailVerificationToken,
} from "@/lib/tokens";
import { updateEmailVerification } from "@/lib/updateUser";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const throwError = (error: string) => {
    setStatus("error");
    setMessage(error);
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }

      try {
        const tokenExists = await getVerificationTokenByToken({ token });

        if (!tokenExists) {
          return throwError("Invalid or expired verification link.");
        }

        if (new Date(tokenExists.expires) <= new Date()) {
          return throwError("Verification link has expired.");
        }

        const user = await getUserByEmail(tokenExists.email);
        if (!user) {
          return throwError("User not found.");
        }

        await updateEmailVerification(user.id);
        await removeEmailVerificationToken(tokenExists.id);
        console.log("deleted");
        setStatus("success");
      } catch {
        throwError("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
      {status === "loading" && (
        <>
          <div className="h-12 w-12 border-4 border-t-transparent border-primary rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Verifying your email...
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            This won’t take long. Please stay on this page.
          </p>
        </>
      )}

      {status === "success" && (
        <div className="max-w-md p-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">
            Email Verified Successfully 🎉
          </h2>
          <p className="mt-2">
            Your email has been verified. You can now log in to your account.
          </p>
          <Link
            href="/login"
            className="block mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-md p-6 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Verification Failed</h2>
          <p className="mt-2">{message}</p>
          <Link
            href="/login"
            className="block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Go to Login
          </Link>
        </div>
      )}
    </section>
  );
};

export default VerifyEmail;
