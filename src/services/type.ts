export class ApiResponseDto<T> {
  data?: T;
  error?: {
    message: string;
    error?: unknown;
  };
  message?: string;
}
