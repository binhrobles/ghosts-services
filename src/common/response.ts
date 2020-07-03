import { APIGatewayProxyResult } from 'aws-lambda';
import config from './config';

export default function responseObject(
  options: APIGatewayProxyResult
): APIGatewayProxyResult {
  return {
    ...options,
    headers: {
      ...options?.headers,
      'Access-Control-Allow-Origin': config.allowedOrigins,
    },
  };
}
