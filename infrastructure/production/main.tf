terraform {
  backend "remote" {
    organization = "binhrobles"

    workspaces {
      name = "ghosts-production"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_caller_identity" "current" {}

module "backend" {
  source              = "../modules/backend"
  region              = var.region
  env                 = var.env
  es_domain_iteration = var.es_domain_iteration
  account_id          = data.aws_caller_identity.current.account_id
}
