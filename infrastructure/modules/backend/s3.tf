resource "aws_s3_bucket" "entries_bucket" {
  bucket = "br-ghosts-entries-${var.env}"
}

resource "aws_s3_bucket_ownership_controls" "entries_bucket_ownership" {
  bucket = aws_s3_bucket.entries_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "entries_public_access" {
  bucket = aws_s3_bucket.entries_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "entries_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.entries_bucket_ownership,
    aws_s3_bucket_public_access_block.entries_public_access,
  ]

  bucket = aws_s3_bucket.entries_bucket.id
  acl    = "public-read"
}
