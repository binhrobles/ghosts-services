import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import shortid from 'shortid';
import { CreateClient, CreateEntry, GetEntry } from './lib/database_client';
import { sanitizeText } from './lib/sanitize';
import handleError from '../common/handleError';
import corsResponse from '../common/response';

const ddbClient = CreateClient();

export const CreateEntryHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const { namespace } = event.pathParameters;
    const entry = JSON.parse(event.body);
    const id = shortid.generate();

    await CreateEntry(ddbClient, {
      ...entry,
      id,
      namespace,
      text: sanitizeText(entry.text),
    });

    console.log(JSON.stringify({ event: 'CREATE', namespace, id }));
    return corsResponse({
      statusCode: 200,
      body: JSON.stringify({ id }),
    });
  } catch (e) {
    handleError(e);
    return corsResponse({
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    });
  }
};

export const GetEntryHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const { namespace, id } = event.pathParameters;

    // TODO: validate that the caller has permissions to access this namespace

    const item = await GetEntry(ddbClient, namespace, id);

    console.log(JSON.stringify({ event: 'GET', namespace, id }));
    return corsResponse({
      statusCode: 200,
      body: JSON.stringify({ ...item }),
    });
  } catch (e) {
    handleError(e);
    return corsResponse({
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    });
  }
};
