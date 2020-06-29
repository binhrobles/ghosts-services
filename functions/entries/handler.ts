import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CreateClient, CreateEntry } from './lib/database_client';
import handleError from '../common/handleError';

const ddbClient = CreateClient();

export const CreateEntryHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const namespace = event.pathParameters.namespace;
    const entry = JSON.parse(event.body);

    await CreateEntry(ddbClient, entry, namespace);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'OK' }),
    };
  } catch (e) {
    handleError(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
