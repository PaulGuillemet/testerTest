/**
 * KMU WAF API
 * KMU WAF API
 *
 * OpenAPI spec version: v1
 * Contact: youssef-externe.liouene@edf.fr
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ApiError } from './apiError';
import { NetworkProviderDto } from './networkProviderDto';
import { PageInfo } from './pageInfo';


export interface ApiResponseSetNetworkProviderDto { 
    content?: Array<NetworkProviderDto>;
    errors?: Array<ApiError>;
    page?: PageInfo;
}
