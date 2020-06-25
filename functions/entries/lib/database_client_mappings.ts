import DynamoDB from 'aws-sdk/clients/dynamodb';

export const mapCreateEntryToItem = (
  entry: CreateEntryInput
): DynamoDB.DocumentClient.PutItemInputAttributeMap => {
  const now = Date.now();
  return {
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
