import { z } from "zod";
import { DefaultServiceResponse } from "../types";
import { authSchema } from "../schemas";

const dafaultUser: z.infer<typeof authSchema> = {
  username: "admin",
  password: "admin",
};

type AuthServiceProps = {
  token: string;
  userData: z.infer<typeof authSchema>;
};

export const AuthService = async (
  userData: z.infer<typeof authSchema>
): Promise<DefaultServiceResponse<AuthServiceProps>> => {
  const isDefaultUser =
    userData.username === "admin" && userData.password === "admin";
  try {
    if (isDefaultUser) {
      const successResponse = {
        success: true,
        status: 200,
        message: "Login successful",
        data: { token: "abc123", userData: dafaultUser },
      };

      localStorage.setItem("authToken", "abc123");
      return successResponse;
    } else {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials",
        errorCode: "INVALID_CREDENTIALS",
      };
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
    };
  }
};

export const AuthServiceWithToken = async (
  authToken: string
): Promise<DefaultServiceResponse<AuthServiceProps>> => {
  try {
    const isDefaultToken = authToken === "abc123";

    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (isDefaultToken) {
      const successResponse = {
        success: true,
        status: 200,
        message: "Login successful",
        data: { token: "abc123", userData: dafaultUser },
      };
      return successResponse;
    } else {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials",
        errorCode: "INVALID_CREDENTIALS",
      };
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
    };
  }
};
