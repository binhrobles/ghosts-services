import 'source-map-support/register';
import { DynamoDBStreamHandler, DynamoDBStreamEvent } from 'aws-lambda';
import { CreateClient } from '../common/es_client';
import handleError from '../common/handleError';

const es = CreateClient(process.env.ES_ENDPOINT);

export const IndexRecords: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  console.log(JSON.stringify(event, null, 2));

  await Promise.all(
    event.Records.map(async (record) => {
      const params = {
        id: record.dynamodb.Keys.id.S,
        index: `n-${record.dynamodb.NewImage.namespace.S}`,
        type: '_doc',
      };
      console.log(JSON.stringify(params, null, 2));
      try {
        if (record.eventName === 'REMOVE') {
          console.log(JSON.stringify({ event: 'DELETE', id: params.id }));
          return es.delete(params);
        } else {
          // format our location into an elasticsearch geopoint object
          const recordWithGeo = {
            ...record.dynamodb.NewImage,
            Location: [
              parseFloat(record.dynamodb.NewImage.Location.M.lng.N),
              parseFloat(record.dynamodb.NewImage.Location.M.lat.N),
            ],
          };
          console.log(JSON.stringify(recordWithGeo, null, 2));
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
