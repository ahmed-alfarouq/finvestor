import { isAxiosError } from "axios";
import isPlaidError from "./isPlaidError";
import { AuthError } from "next-auth";

export function handleError(err: unknown, errorMessage?: string) {
  const isDiv = process.env.NODE_ENV === "development";

  if (err instanceof AuthError) {
    switch (err.type) {
      case "CredentialsSignin":
        throw Error("Invalid credentials!");
      case "AccessDenied":
        throw Error("Your account has been disabled by the administrator.");
      case "CallbackRouteError":
        throw Error(err?.cause?.err?.message || "Something went wrong!");
      default:
        throw Error("Something went wrong!");
    }
  }

  if (isAxiosError(err) && isPlaidError(err.response?.data)) {
    throw Error(err.response.data.error_message);
  }

  if (err instanceof Error || isAxiosError(err)) {
    const newError = new Error(err.message);
    if (isDiv) newError.stack = err.stack;

    throw newError;
  }

  throw Error(errorMessage || "An unexpected error happened");
}
