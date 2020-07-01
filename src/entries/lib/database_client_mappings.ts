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
  const createTime = Date.now();
  const ttl = entry.ttl === TTLOptions.NEVER ? null : getTTLSeconds(entry.ttl);

  return {
    ...entry,
    createTime,
    ttl,
  };
};
