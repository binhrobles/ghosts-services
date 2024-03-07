/* Exposing Terraform resources to serverless CFN via CFN exports */
/* Creates a strict dependency, disallowing updates that modify these values, so these should be stable */
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
        "EntriesTableName": {
            "Value": "${aws_dynamodb_table.entries_table.id}",
            "Export": {
                "Name": "EntriesTableName-${var.env}"
            }
        },
        "EntriesTableArn": {
            "Value": "${aws_dynamodb_table.entries_table.arn}",
            "Export": {
                "Name": "EntriesTableArn-${var.env}"
            }
        },
        "EntriesBucketName": {
            "Value": "${aws_s3_bucket.entries_bucket.id}",
            "Export": {
                "Name": "EntriesBucketName-${var.env}"
            }
        },
    }
}
STACK
}
