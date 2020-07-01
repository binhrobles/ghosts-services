import 'source-map-support/register';
import { CreateClient } from '../common/es_client';
import handleError from '../common/handleError';
import namespaceTemplate from './templates/namespace';

const es = CreateClient(process.env.ES_ENDPOINT);

export const ProvisionTemplatesHandler = async (): Promise<void> => {
  try {
    return await es.indices.putTemplate({
      name: 'namespace',
      body: namespaceTemplate,
    });
  } catch (e) {
    handleError(e, { event: 'Failed to provision templates' });
    throw e;
  }
};
