import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AXIOS_ERROR_CODES } from "@/constants/errors";
import { AppError } from "@/utils/AppError";
import { BASE_URL } from "@/constants/api";

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.message || "Unknown Axios error";

      if (error.code === AXIOS_ERROR_CODES.TIMEOUT) {
        throw new AppError("Request timed out", message);
      }

      if (error.request && !error.response) {
        throw new AppError("Request wasn't sent", message);
      }

      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case StatusCodes.NOT_FOUND:
            throw new AppError("Resource not found", message);
          case StatusCodes.FORBIDDEN:
            throw new AppError("Access denied", message);
          case StatusCodes.INTERNAL_SERVER_ERROR:
            throw new AppError("Server error", message);
          default:
            throw new AppError(
              "Unexpected server response",
              `Status: ${status} (${message})`
            );
        }
      }
    }

    throw new AppError("Unexpected error", String(error?.message || error));
  }
};
