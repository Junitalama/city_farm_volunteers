provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "farmcity" {
  bucket = "farmcity"

  website {
    index_document = "index.html"
  }

  force_destroy = true  

  versioning {
    enabled = false  
  }

  lifecycle_rule {
    enabled = false  
  }
}

resource "aws_s3_bucket_policy" "farmcity_bucket_policy" {
  bucket = aws_s3_bucket.farmcity.bucket

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::farmcity/*"
    }
  ]
}
EOF
}

resource "aws_s3_bucket_public_access_block" "farmcity_public_access_block" {
  bucket = aws_s3_bucket.farmcity.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "farmcity_website" {
  bucket = aws_s3_bucket.farmcity.bucket

  index_document {
    suffix = "index.html"
  }

  
}
