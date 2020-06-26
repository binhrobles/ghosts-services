import 'source-map-support/register';
import { DynamoDBStreamHandler, DynamoDBStreamEvent } from 'aws-lambda';
import { CreateClient } from '../common/es_client';
import { handleError } from '../common/error';

const es = CreateClient(process.env.ES_ENDPOINT);

export const IndexRecords: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  event.Records.forEach(async (record) => {
    const params = {
      id: record.dynamodb.Keys.id.S,
      index: record.dynamodb.NewImage.Namespace.S || 'public', // TODO: read if n indices is smart
      type: '_doc',
    };
    try {
      if (record.eventName === 'REMOVE') {
        await es.delete(params);
        console.log(JSON.stringify({ event: 'DELETE', id: params.id }));
      } else {
        // format our location into an elasticsearch geopoint object
        const recordWithGeo = {
          ...record.dynamodb.NewImage,
          Location: [
            record.dynamodb.NewImage.Location.M.lng.N,
            record.dynamodb.NewImage.Location.M.lat.N,
          ],
        };
        await es.index({
          ...params,
          body: recordWithGeo,
        });
        console.log(JSON.stringify({ event: 'PUT', id: params.id }));
      }
    } catch (e) {
      handleError(e, { id: params.id });
      throw e;
    }
  });
};
