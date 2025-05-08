export interface ApiResponseDto<T> {
  data?: T;
  error?: ApiErrorResponse;
  message?: string;
}

export interface ApiErrorResponse {
  error: APIErrorResponseError;
}

export interface APIErrorResponseError {
  message: string;
  error: ErrorError;
}

export interface ErrorError {
  statusCode: number;
  message: string;
  error: string;
}
