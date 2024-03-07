import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Entry, EntriesGeoJSON } from '../types.d';
import { Readable } from 'stream';

const TABLE_NAME = process.env.DDB_TABLE || '';
const BUCKET_NAME = process.env.BUCKET_NAME || '';
const INDEX_FILENAME = 'index.geojson';

// Create AWS SDK clients
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient());
const s3 = new S3Client();

async function CreateEntry(entry: Entry): Promise<void> {
  // save to ddb
  // TODO: save to S3 ?
  await ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        ...entry,
        createTime: Date.now(),
      },
    })
  );

  // update index
  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: INDEX_FILENAME,
    })
  );

  if (!Body) {
    throw new Error('Failed to download index file');
  }

  const entriesIndex: EntriesGeoJSON = JSON.parse(
    await Body.transformToString()
  );
  entriesIndex.features.push({
    type: 'Feature',
    properties: {
      id: entry.id,
    },
    geometry: {
      type: 'Point',
      coordinates: [entry.location.lng, entry.location.lat],
    },
  });
  const indexString = JSON.stringify(entriesIndex);
  const stream = Readable.from(indexString);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: INDEX_FILENAME,
      Body: stream,
      ACL: 'public-read',
      ContentType: 'application/json',
      ContentLength: indexString.length,
    })
  );
}

async function GetEntry(id: string): Promise<Entry> {
  const result = await ddb.send(
    new GetCommand({
      TableName: TABLE_NAME,
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
  const result = await ddb.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );
  return Promise.resolve(result.Items as Entry[]);
}

export default {
  CreateEntry,
  GetEntry,
  GetEntries,
};
