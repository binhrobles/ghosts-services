terraform {
  backend "remote" {
    organization = "binhrobles"

    workspaces {
      name = "ghosts"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

