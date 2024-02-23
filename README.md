# ghosts-services

![Serverless & Terraform Deployments](https://github.com/binhrobles/ghosts-services/workflows/Serverless%20&%20Terraform%20Deployment/badge.svg)

## Stack

- [Ghosts React Client](https://github.com/binhrobles/ghosts-client)
- [Serverless](https://www.serverless.com/) for API Gateway and function creation
- DynamoDB for persistent storage
- Entries lambda behind API Gateway for Entries CRUD

### Initial Stack ($)

- see [using-elasticsearch](https://github.com/binhrobles/ghosts-services/tree/using-elasticsearch)
- Amazon Elasticsearch for performant geospatial queries
- Query lambdas behind API Gateway provides client abstraction for ES
- Indexer lambda listens to DynamoDB events and indexes entries into Elasticsearch
- Provision lambda for executing arbitrary provisioning calls to Elasticsearch

![Arch Diagram](https://github.com/binhrobles/ghosts-services/blob/master/docs/ghosts.svg)

## Usage

### Locally

- For local dev, testing, and quick feedback
- `yarn start` should start the API in offline mode
- Lambdas are available behind `localhost:4000/dev`

### Personal Stack

- For testing with real/shared infrastructure, integration tests, pre-commit smoke test
- `yarn deploy:personal-complete` should deploy a personal stack using the machine's `whoami` value
- `yarn deploy:personal` to just deploy the functions
- Lambdas are available behind `ghosts-api.binhrobles.com/{whoami}`
- Cleanup! `yarn destroy:personal` || `yarn destroy:personal-complete`

### Deploying

#### Manual Steps

- (optional) Certificate created in ACM

#### Handled by Deployment Pipeline

- Github Action deploys to prod with `sls deploy -s production`
- `serverless-custom-domain` creates a path off the root domain to the deployed stage
- Github Action invokes Elasticsearch provisioning lambda

#### Post-Deploy Manual Steps

- (optional) Associate API gateway endpoint /stage w/ custom domain
