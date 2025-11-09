import axios from "axios";
import { get } from "./http";
import { AXIOS_ERROR_CODES } from "@/constants/errors";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/utils/AppError";
import { BASE_URL } from "@/constants/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns response data on successful request", async () => {
    const payload = { name: "Alice" };
    mockedAxios.get.mockResolvedValueOnce({ data: payload });

    const res = await get("/users");

    expect(res).toBe(payload);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/users`,
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      })
    );
  });

  it("throws AppError on request timeout", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      code: AXIOS_ERROR_CODES.TIMEOUT,
      message: "timeout",
      isAxiosError: true,
    });

    const expectedError = new AppError("Request timed out", "timeout");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError when request is sent but no response is received", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      request: {},
      message: "no response",
      isAxiosError: true,
    });

    const expectedError = new AppError("Request wasn't sent", "no response");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError on 404 Not Found", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: StatusCodes.NOT_FOUND },
      message: "Not found",
      isAxiosError: true,
    });

    const expectedError = new AppError("Resource not found", "Not found");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError on 403 Forbidden", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: StatusCodes.FORBIDDEN },
      message: "Forbidden",
      isAxiosError: true,
    });

    const expectedError = new AppError("Access denied", "Forbidden");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError on 500 Internal Server Error", async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: StatusCodes.INTERNAL_SERVER_ERROR },
      message: "Internal server error",
      isAxiosError: true,
    });

    const expectedError = new AppError("Server error", "Internal server error");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError on unknown HTTP status", async () => {
    const status = 499;
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { status },
      message: "Unknown error",
      isAxiosError: true,
    });

    const expectedError = new AppError(
      "Unexpected server response",
      `Status: ${status} (Unknown error)`
    );
    await expect(get("/users")).rejects.toThrow(expectedError);
  });

  it("throws AppError on non-Axios error", async () => {
    mockedAxios.isAxiosError.mockReturnValue(false);
    mockedAxios.get.mockRejectedValueOnce(new Error("Unknown error"));

    const expectedError = new AppError("Unexpected error", "Unknown error");
    await expect(get("/users")).rejects.toThrow(expectedError);
  });
});
