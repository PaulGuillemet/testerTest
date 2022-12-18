import { ApiErrorDisplay } from './apiError';

export interface ApiCallWrapper {
  error?: ApiErrorDisplay;
  resp?: any;
}
