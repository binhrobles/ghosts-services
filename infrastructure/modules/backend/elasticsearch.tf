resource "aws_elasticsearch_domain" "es_domain" {
  domain_name           = local.domain_name
  elasticsearch_version = "2.3"

  cluster_config {
    instance_type  = var.es_instance_type
    instance_count = 1
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10
    volume_type = "gp2"
  }

  access_policies = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "es:*",
      "Principal": {
        "AWS": "${var.account_id}"
      },
      "Effect": "Allow",
      "Resource": "arn:aws:es:${var.region}:${var.account_id}:domain/${local.domain_name}/*"
    }
  ]
}
POLICY
}
