import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {
  CreateClient,
  CreateEntry,
  GetNamespaceEntries,
} from './lib/database_client';

const ddbClient = CreateClient();

const handleError = (e: Error) => {
  console.error(JSON.stringify(e, null, 2));
};

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

// TODO: will this be necessary if we have elasticsearch?
export const GetNamespaceEntriesHandler: APIGatewayProxyHandler = async (
  event
) => {
  try {
    const namespace = event.pathParameters.namespace;
    const entries = await GetNamespaceEntries(ddbClient, namespace);

    return {
      statusCode: 200,
      body: JSON.stringify(entries),
    };
  } catch (e) {
    handleError(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
