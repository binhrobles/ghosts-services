import DynamoDB from 'aws-sdk/clients/dynamodb';
import { CreateEntryInput } from '../types.d';
import { TTLOptions } from '../enums';

const getTTLSeconds = (numDays: number) => {
  const today = new Date();
  return Math.floor(today.setDate(today.getDate() + numDays) / 1000);
};

export const mapCreateEntryToItem = (
  entry: CreateEntryInput
): DynamoDB.DocumentClient.PutItemInputAttributeMap => {
  const now = Date.now();

  const TTL = entry.ttl === TTLOptions.NEVER ? null : getTTLSeconds(entry.ttl);

  return {
    id: entry.id,
    namespace: entry.namespace,
    TTL,
    CreateTime: now,
    Text: entry.text,
    Description: entry.description,
    Location: entry.location,
    Date: entry.date,
    Submitter: entry.submitter,
    Tags: entry.tags,
  };
};
