variable "region" {
  type    = string
  default = "us-west-1"
}

variable "env" {
  type = string
  default = "dev"
}

variable "domain" {
  default = "ghosts-v1"
}

locals {
  domain_env = "${var.domain}-${var.env}"
}
