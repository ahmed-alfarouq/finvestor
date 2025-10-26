import { PlaidError } from "plaid";

/**
 * take error.reponse which wraps plaid error data
 * @param error: error.response.data
 * @returns boolean
 */
const isPlaidError = (error: unknown): error is PlaidError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "error_type" in error &&
    "error_code" in error &&
    "error_message" in error
  );
};

export default isPlaidError;
