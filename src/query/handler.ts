import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { CreateClient, GetRecentEntries } from '../common/es_client';
import handleError from '../common/handleError';
import corsResponse from '../common/response';

const es = CreateClient(process.env.ES_ENDPOINT);

export const GetRecentEntriesHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const namespace = `n-${event.pathParameters.namespace}`;
    const count = event.queryStringParameters?.count
      ? parseInt(event.queryStringParameters.count, 10)
      : 100;

    const entries = await GetRecentEntries({ client: es, namespace, count });

    console.log({ event: 'QUERY', count: entries.length });
    return corsResponse({
      statusCode: 200,
      body: JSON.stringify(entries),
    });
  } catch (e) {
    handleError(e);
    return corsResponse({
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    });
  }
};
