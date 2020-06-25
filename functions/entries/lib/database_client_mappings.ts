import DynamoDB from 'aws-sdk/clients/dynamodb';
import shortid from 'shortid';

export const mapCreateEntryToItem = (
  entry: CreateEntryInput
): DynamoDB.DocumentClient.PutItemInputAttributeMap => {
  const _id = shortid.generate();
  const now = Date.now();

  return {
    _id,
    CreateTime: now,
    Text: entry.text,
    Description: entry.description,
    Location: entry.location,
    TTL: entry.ttl,
    Date: entry.date,
    Submitter: entry.submitter,
    Tags: entry.tags,
  };
};
