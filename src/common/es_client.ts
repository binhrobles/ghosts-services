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
}): Promise<any> => {
  // TODO: this should be sorting by createTime desc
  const response = await client.search({
    index: namespace,
    size: count,
    body: {
      query: {
        match_all: {},
      },
      _source: ['description', 'submitter', 'location', 'tags'],
    },
  });
  return response.hits.hits;
};
