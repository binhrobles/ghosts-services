/* uses a service-generated ID for the partition key */
/* acceptable since elasticsearch will handle all querying responsibilities */
resource "aws_dynamodb_table" "entries_table" {
  name = "ghosts-api-Entries-${var.env}"

  /* taking advantage of provisioned free-tier */
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "TTL"
    enabled        = true
  }

  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"
}
