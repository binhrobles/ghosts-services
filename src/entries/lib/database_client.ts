import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Entry } from '../types.d';

const TableName = process.env.DDB_TABLE || '';

// Create a DynamoDB client
const client = DynamoDBDocumentClient.from(new DynamoDBClient());

async function CreateEntry(entry: Entry): Promise<void> {
  const result = await client.send(
    new PutCommand({
      TableName,
      Item: {
        ...entry,
        createTime: Date.now(),
      },
    })
  );
  console.log(JSON.stringify(result.ConsumedCapacity));
}

async function GetEntry(id: string): Promise<Entry> {
  const result = await client.send(
    new GetCommand({
      TableName,
      Key: {
        id,
      },
    })
  );
  console.log(JSON.stringify(result.ConsumedCapacity));
  return result.Item as Entry;
}

async function GetEntries(): Promise<Entry[]> {
  // TODO: this should be a query
  const result = await client.send(
    new ScanCommand({
      TableName,
    })
  );
  return Promise.resolve(result.Items as Entry[]);
}

export default {
  CreateEntry,
  GetEntry,
  GetEntries,
};
