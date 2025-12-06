
import {Response} from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

class ResponseFormatter {
  public success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      ...(message && {message}),
    };

    res.status(statusCode).json(response);
  }

  public error(res: Response, message: string, statusCode: number = 400): void {
    const response: ApiResponse = {
      success: false,
      error: message,
    };

    res.status(statusCode).json(response);
  }

  public paginated<T>(
    res: Response,
    data: T[],
    meta: {page: number; limit: number; total: number},
    message?: string
  ): void {
    const response: ApiResponse<T[]> = {
      success: true,
      data,
      meta,
      ...(message && {message}),
    };

    res.status(200).json(response);
  }
}

export default new ResponseFormatter();
