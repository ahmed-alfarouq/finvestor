import { isAxiosError } from "axios";
import isPlaidError from "./isPlaidError";

export function handleError(err: unknown, errorMessage?: string) {
  const isDiv = process.env.NODE_ENV === "development";

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
