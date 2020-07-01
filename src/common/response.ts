import { APIGatewayProxyResult } from 'aws-lambda';

export default function responseObject(
  options: APIGatewayProxyResult
): APIGatewayProxyResult {
  return {
    ...options,
    headers: {
      ...options?.headers,
      'Access-Control-Allow-Origin': '*.binhrobles.com',
      'Access-Control-Allow-Credentials': true,
    },
  };
}
