import { ApiError } from './apiError';
import { PageInfo } from './pageInfo';

export interface ApiResponse<T> {
  content?: T;
  errors?: Array<ApiError>;
  page?: PageInfo;
}
