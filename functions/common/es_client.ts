import { Client as ESClient } from 'elasticsearch';
import awsEsClient from 'http-aws-es';

export const CreateClient = (endpoint: string): ESClient => {
  return new ESClient({
    hosts: [endpoint],
    connectionClass: awsEsClient,
  });
};
