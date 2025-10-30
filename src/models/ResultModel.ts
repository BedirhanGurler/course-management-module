export interface ResultModel<T> {
  success: boolean;
  message: string;
  data: T;
}
