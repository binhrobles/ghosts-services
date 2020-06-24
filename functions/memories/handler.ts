import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import DBClient from './lib/database_client';

const handleError = (e: Error) => {
  console.error(JSON.stringify(e, null, 2));
};

export const CreateMemory: APIGatewayProxyHandler = async (event) => {
  try {
    const entry = JSON.parse(event.body);
    await DBClient.CreateMemory({
      ...entry,
      user: event.pathParameters.user,
    });

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

export const GetUserMemories: APIGatewayProxyHandler = async (event) => {
  try {
    const entries = await DBClient.GetUserMemories({
      user: event.pathParameters.user,
    });

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
