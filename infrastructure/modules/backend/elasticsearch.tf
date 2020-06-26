resource "aws_cloudwatch_log_group" "es_app_logs" {
  name = "${local.domain_name}-app"
}

resource "aws_cloudwatch_log_resource_policy" "es_cloudwatch_log_policy" {
  policy_name = "Ghosts ES CloudWatch Policy - ${var.env}"

  policy_document = <<CONFIG
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
CONFIG
}

resource "aws_elasticsearch_domain" "es_domain" {
  domain_name           = local.domain_name
  elasticsearch_version = "7.4"

  cluster_config {
    instance_type  = "t2.small.elasticsearch"
    instance_count = 1
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10
    volume_type = "gp2"
  }

  log_publishing_options {
    log_type                 = "ES_APPLICATION_LOGS"
    cloudwatch_log_group_arn = aws_cloudwatch_log_group.es_app_logs.arn
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
