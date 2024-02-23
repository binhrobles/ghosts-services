import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { mapCreateEntryToItem } from './database_client_mappings';
import { Entry } from '../types.d';

// TODO: move into CreateClient
const TableName = process.env.IS_OFFLINE ? 'Entries' : process.env.DDB_TABLE;
const config = process.env.IS_OFFLINE
  ? {
      endpoint: 'http://localhost:4566',
    }
  : {};

// Create a DynamoDB client
const client = DynamoDBDocumentClient.from(new DynamoDBClient(config));
console.log(
  JSON.stringify({ event: 'Client created', table: TableName, config })
);

export async function CreateEntry(entry: Entry): Promise<void> {
  const Item = mapCreateEntryToItem(entry);

  const result = await client.send(
    new PutCommand({
      TableName,
      Item,
    })
  );
  console.log(JSON.stringify(result.ConsumedCapacity));
}

export async function GetEntry(namespace: string, id: string): Promise<Entry> {
  const result = await client.send(
    new GetCommand({
      TableName,
      Key: {
        id,
        namespace,
      },
    })
  );
  console.log(JSON.stringify(result.ConsumedCapacity));
  return result.Item as Entry;
}
