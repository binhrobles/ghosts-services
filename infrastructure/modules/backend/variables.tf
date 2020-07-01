variable "region" {
  type    = string
  default = "us-west-1"
}

variable "env" {
  type    = string
  default = "dev"
}

variable "es_version" {
  type    = string
  default = "7.4"
}

variable "es_instance_type" {
  type    = string
  default = "t2.small.elasticsearch"
}

variable "es_domain_iteration" {
  type    = string
  default = "v1"
}

variable "account_id" {
  type = string
}

locals {
  domain_name = "ghosts-${var.es_domain_iteration}-${var.env}"
}
