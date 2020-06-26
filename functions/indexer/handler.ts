import { DynamoDBStreamHandler } from 'aws-lambda';
import 'source-map-support/register';

export const IndexRecords: DynamoDBStreamHandler = (event) => {
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function (record) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
};
