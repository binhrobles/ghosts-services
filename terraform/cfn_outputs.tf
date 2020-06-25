resource "aws_cloudformation_stack" "cfn_outputs" {
  name = "terraform-dummy-stack"

  template_body = <<STACK
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Resources": {
        "StackDatetimeResource": {
            "Type": "AWS::CloudFormation::WaitConditionHandle",
            "Metadata": {
                "Comment": "This is a dummy resource so that the Update_Stack won't fail even if there are no other changes to the template",
                "StackDatetime": "${timestamp()}"
            }
        }
    },
    "Outputs": {
        "ESDomainArn": {
            "Value": "${aws_elasticsearch_domain.es_domain.arn}",
            "Export": {
                "Name": "GhostsESDomainArn-${var.env}"
            }
        },
        "ESDomainEndpoint": {
            "Value": "${aws_elasticsearch_domain.es_domain.endpoint}",
            "Export": {
                "Name": "GhostsESDomainEndpoint-${var.env}"
            }
        }
    }
}
STACK
}
