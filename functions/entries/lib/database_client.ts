import DynamoDB from 'aws-sdk/clients/dynamodb';
import { mapCreateEntryToItem } from './database_client_mappings';

export function CreateClient(): DynamoDB.DocumentClient {
  const config = process.env.IS_OFFLINE
    ? {
        endpoint: 'http://localhost:4566',
      }
    : {};
  return new DynamoDB.DocumentClient(config);
}

export async function CreateEntry(
  client: DynamoDB.DocumentClient,
  entry: CreateEntryInput,
  namespace: string
): Promise<void> {
  const Item = { ...mapCreateEntryToItem(entry), namespace };

  const result = await client
    .put({
      TableName: 'Entries',
      Item,
    })
    .promise();
  console.log(JSON.stringify(result.ConsumedCapacity));
}

export async function GetNamespaceEntries(
  client: DynamoDB.DocumentClient,
  user: string
): Promise<Array<any>> {
  // only requests fields:
  const projection = 'Prompt, WordBank, CreateTime';
  const result = await client
    .query({
      TableName: 'Entries',
      ExpressionAttributeNames: {
        // because `User` is a DDB reserved word
        '#user': 'User',
      },
      ExpressionAttributeValues: {
        ':user': user,
      },
      KeyConditionExpression: '#user = :user',
      ProjectionExpression: projection,
    })
    .promise();
  console.log(JSON.stringify(result.ConsumedCapacity));

  return result.Items;
}
