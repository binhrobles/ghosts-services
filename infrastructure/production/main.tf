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

module "database" {
  source = "../modules/database"
}
