import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import shortid from 'shortid';
import client from './lib/entries_client';
import { sanitizeText } from './lib/sanitize';
import handleError from '../common/handleError';
import corsResponse from '../common/response';

export const RefreshIndex = async () => {
  await client.RefreshIndex();
  console.log(JSON.stringify({ event: 'REFRESH_COMPLETE' }));
};

export const CreateEntryHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const { namespace } = event.pathParameters;
    const entry = JSON.parse(event.body);
    const id = shortid.generate();

    await client.CreateEntry({
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

    const item = await client.GetEntry(id);

    if (!item) {
      console.error(JSON.stringify({ event: 'MISS', namespace, id }));
      return corsResponse({
        statusCode: 404,
        body: JSON.stringify({ id, message: 'Does not exist' }),
      });
    }

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
