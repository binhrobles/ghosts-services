import 'source-map-support/register';
import { DynamoDBStreamHandler, DynamoDBStreamEvent } from 'aws-lambda';
import { CreateClient } from '../common/es_client';
import handleError from '../common/handleError';

const es = CreateClient(process.env.ES_ENDPOINT);

export const IndexRecords: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const params = {
        id: record.dynamodb.Keys.id.S,
        index: `n-${record.dynamodb.NewImage.namespace.S}`,
        type: '_doc',
      };
      try {
        if (record.eventName === 'REMOVE') {
          console.log(JSON.stringify({ event: 'DELETE', id: params.id }));
          return es.delete(params);
        } else {
          // format our location into an elasticsearch geopoint object
          const recordWithGeo = {
            ...record.dynamodb.NewImage,
            location: [
              parseFloat(record.dynamodb.NewImage.location.M.lng.N),
              parseFloat(record.dynamodb.NewImage.location.M.lat.N),
            ],
          };
          console.log(JSON.stringify({ event: 'PUT', id: params.id }));
          return es.index({
            ...params,
            body: recordWithGeo,
          });
        }
      } catch (e) {
        handleError(e, { id: params.id });
        throw e;
      }
    })
  );
};
