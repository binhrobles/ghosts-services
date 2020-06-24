resource "aws_dynamodb_table" "entries_table" {
  name = "Memories"

  /* taking advantage of provisioned free-tier */
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2

  /* hash_key  = "User" */
  /* range_key = "Prompt_CreateTime" */

  /* attribute { */
  /*   name = "User" */
  /*   type = "S" */
  /* } */

  /* attribute { */
  /*   name = "Prompt_CreateTime" */
  /*   type = "S" */
  /* } */
}
