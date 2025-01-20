export type DefaultSuccessResponse<T = unknown> = {
  success: true;
  status: number;
  message: string;
  data: T;
};

export type DefaultErrorResponse = {
  success: false;
  status: number;
  message: string;
  errorCode?: string;
};

export type DefaultServiceResponse<T = unknown> =
  | DefaultSuccessResponse<T>
  | DefaultErrorResponse;
