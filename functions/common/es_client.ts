import { Client as ESClient } from 'elasticsearch';
import awsEsClient from 'http-aws-es';

export const CreateClient = (endpoint: string): ESClient => {
  return new ESClient({
    hosts: [endpoint],
    connectionClass: awsEsClient,
  });
};

export const GetRecentEntries = async ({
  client,
  namespace,
  count,
}: {
  client: ESClient;
  namespace: string;
  count: number;
}) => {
  // TODO: this should be sorting by CreateTime desc
  const response = await client.search({
    index: namespace,
    size: count,
    body: {
      query: {
        match_all: {},
      },
      _source: ['Description', 'Submitter', 'Location', 'Tags'],
    },
  });
  console.log(response);
  return response.hits.hits;
};
