export type SuccessResponse<T> = {
  status: "success";
  data: T;
  message?: string;
  meta?: Record<string, any>;
  pagination?: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export type ErrorResponse = {
  status: "error";
  error: {
    code: number;
    type?: string;
    message: string;
    details?: Record<string, any>;
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
