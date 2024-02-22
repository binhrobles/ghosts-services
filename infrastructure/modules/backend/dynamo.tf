resource "aws_dynamodb_table" "entries_table" {
  name = "ghosts-api-Entries-${var.env}"

  /* taking advantage of provisioned free-tier */
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1

  /* uses a service-generated ID for the partition key */
  hash_key  = "id"

  attribute {
    name = "id"
    type = "S"
  }

  /* TODO: GSI on long / lat query? on most recents? */

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}
