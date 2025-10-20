import { PlaidError } from "plaid";

const isPlaidError = (error: unknown): error is PlaidError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "error_type" in error &&
    "error_code" in error &&
    "error_message" in error &&
    typeof error.error_code === "string" &&
    typeof error.error_message === "string"
  );
};

export default isPlaidError;
