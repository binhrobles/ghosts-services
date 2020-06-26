import { DynamoDBStreamHandler, DynamoDBStreamEvent } from 'aws-lambda';
import 'source-map-support/register';

export const IndexRecords: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  event.Records.forEach((record) => {
    console.log(JSON.stringify(record.dynamodb, null, 2));
    switch (record.eventName) {
      case 'INSERT':
        // check first, then post to es index
        // for idempotency
        console.log('INSERT triggered');
        break;
      case 'MODIFY':
        // post to es index
        console.log('MODIFY triggered');
        break;
      case 'REMOVE':
        // delete from es index
        console.log('REMOVE triggered');
        break;
      default:
        console.log(
          JSON.stringify(
            {
              _id: record.dynamodb.Keys['_id'].S,
              streamEvent: record.eventName,
              streamID: record.eventID,
              message: 'Ignoring stream event',
            },
            null,
            2
          )
        );
    }
  });
};
