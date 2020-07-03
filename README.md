# ghosts-services

![Serverless & Terraform Deployment](https://github.com/binhrobles/ghosts-services/workflows/Serverless%20&%20Terraform%20Deployment/badge.svg)

## Stack

- [Ghosts React Client](https://github.com/binhrobles/ghosts-client)
- [Serverless](https://www.serverless.com/) for API Gateway and function creation
- DynamoDB for persistent storage
- Amazon Elasticsearch for performant geospatial queries
- Entries lambda behind API Gateway for Entries creation
- Indexer lambda listens to DynamoDB events and indexes entries into Elasticsearch
- Query lambdas behind API Gateway provides client abstraction for ES
- Provision lambda for executing arbitrary provisioning calls to Elasticsearch

## Usage

### Locally

- For local dev, testing, and quick feedback
- `yarn start` should raise localstack docker container and start the API in offline mode
- Lambdas are available behind `localhost:4000/dev`

### Personal Stack

- For testing with real/shared infrastructure, integration tests, pre-commit smoke test
- `yarn deploy:personal-complete` should deploy a personal stack using the machine's `whoami` value
- `yarn deploy:personal` to just deploy the functions
- Lambdas are available behind `ghosts-api.binhrobles.com/{whoami}`
- Cleanup! `yarn destroy:personal` || `yarn destroy:personal-complete`

### Deploying

#### Manual Steps

- Domain registered and updated in `serverless.yml/custom/customDomain`
- Certificate created in ACM
- Custom domain created with: `sls create_domain`
  - could've done this in terraform, but seems like serverless-custom-domain plugin expects some CFN outputs to be made available for the function deployments to work

#### Handled by Deployment Pipeline

- Github Action deploys to prod with `sls deploy -s prod`
- `serverless-custom-domain` creates a path off the root domain to the deployed stage
- TODO: Github Action invokes Elasticsearch provisioning lambda

#### Post-Deploy Manual Steps

- In the `Serverless Domain Manager Summary` or in `API Gateway->Custom Domain Names->{your domain name}`, find the generated `Target Domain`
- **FRAGILE**: In your domain config, point your domain to the `Target Domain`
  - Target Domain will change if stack is torn down, but not during redeployments
