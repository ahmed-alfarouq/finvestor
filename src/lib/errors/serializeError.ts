import { isAxiosError } from "axios";

/**
 * Serialized an error object to send throw NextReponse.json()
 * @param err : Error | AxiosError
 * @returns
 */
const serializeError = (err: unknown) => {
  if (err instanceof Error || isAxiosError(err)) {
    return {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      name: err.name,
    };
  }

  return undefined;
};

export default serializeError;
