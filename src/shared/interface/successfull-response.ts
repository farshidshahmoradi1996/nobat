export interface SuccessfulResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
