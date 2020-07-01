/* uses a service-generated ID for the partition key */
/* acceptable since elasticsearch will handle all querying responsibilities */
/* use namespace as sort key only as precaution against cross-namespace id collision */
resource "aws_dynamodb_table" "entries_table" {
  name = "ghosts-api-Entries-${var.env}"

  /* taking advantage of provisioned free-tier */
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2

  hash_key = "id"
  range_key = "namespace"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "namespace"
    type = "S"
  }

  ttl {
    attribute_name = "TTL"
    enabled        = true
  }

  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"
}
