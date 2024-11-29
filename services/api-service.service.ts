import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import QH_CONSTANTS from "~/constants";
import { qhSecuredLS } from "~/utils/secure-ls";

interface IResponse {
  status: number | null;
  message: string;
  code: number | null;
  data: object;
  error: object;
  meta?: any;
}

class ApiResponse implements IResponse {
  status = null;
  success = false;
  message = "";
  code = null;
  data: any = {};
  error: any = {};
  meta = null;
  constructor(data: any) {
    Object.assign(this, data);
  }
}

interface IRequest extends AxiosRequestConfig {}

export default class ApiService {
  public static GET = "get";
  public static POST = "post";
  public static PATCH = "patch";
  public static PUT = "put";
  public static DELETE = "delete";

  private static http = axios.create({
    baseURL: ENV.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Initialize interceptors statically
  static initializeInterceptors() {
    ApiService.http.interceptors.request.use((config) => {
      const accessToken = qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN);
      if (accessToken) {
        config.headers["Access-Token"] = accessToken;
      }
      return config;
    });
  }

  // Static token setter
  public static setToken(token: string) {
    qhSecuredLS.set(QH_CONSTANTS.AUTH_TOKEN, token);
  }

  public static async pingServer() {
    await ApiService.run({
      method: ApiService.GET,
      url: "/",
    });
  }

  static getErrorMessage(errors = []) {
    const { name, message } = errors?.[0] ?? {};
    if (name && message) return `${name} ${message}`;
    return null;
  }

  // Static run method
  public static async run(request: IRequest) {
    let response;
    try {
      const serverResponse = await ApiService.http(request);
      response = new ApiResponse({
        // status: serverResponse.data.meta.status,
        // code: serverResponse.data.meta.code,
        success: true,
        // message: serverResponse.data.message,
        data: serverResponse.data.data ?? serverResponse.data,
        // meta: serverResponse.data.meta,
      });
    } catch (err: AxiosError | any) {
      if (!err.response) {
        // Network Error
        response = new ApiResponse({
          message:
            err?.message === "Network Error"
              ? "Oops! Check internet connection"
              : err.message,
          status: -1,
        });

        // Valid server error or others
      } else if (err.response.data) {
        response = new ApiResponse({
          // code: err.response.data.meta.statusCode,
          message:
            // err.response.data.error.message ??
            "Oops! An unknown error ocurred. Please try again.",
          // status: err.response.data.statusMessage,
          error: err.response.data,
        });

        // No internet
      } else {
        response = new ApiResponse({
          message: err.message ?? "Oops! Check internet connection",
          status: -1,
        });
      }
    }
    return response;
  }
}

ApiService.initializeInterceptors();
