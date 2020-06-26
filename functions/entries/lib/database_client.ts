import DynamoDB from 'aws-sdk/clients/dynamodb';
import { mapCreateEntryToItem } from './database_client_mappings';
import { CreateEntryInput } from '../types.d';

// TODO: move into CreateClient
const TableName = process.env.IS_OFFLINE ? 'Entries' : process.env.DDB_TABLE;

export function CreateClient(): DynamoDB.DocumentClient {
  const config = process.env.IS_OFFLINE
    ? {
        endpoint: 'http://localhost:4566',
      }
    : {};
  console.log(
    JSON.stringify({ event: 'Client created', table: TableName, config })
  );
  return new DynamoDB.DocumentClient(config);
}

export async function CreateEntry(
  client: DynamoDB.DocumentClient,
  entry: CreateEntryInput,
  Namespace: string
): Promise<void> {
  const Item = { Namespace, ...mapCreateEntryToItem(entry) };

  const result = await client
    .put({
      TableName,
      Item,
    })
    .promise();
  console.log(JSON.stringify(result.ConsumedCapacity));
}
