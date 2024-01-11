provider "aws" {
  region = "us-east-1" # Change to your AWS region
}

# S3 Bucket to store the Next.js application code
resource "aws_s3_bucket" "nextjs_app_bucket" {
  bucket = "my-nextjs-app-bucket" # Change to a unique bucket name
  acl    = "private"
}

# Upload the Next.js application code to the S3 Bucket
resource "aws_s3_bucket_object" "nextjs_app_code" {
  bucket = aws_s3_bucket.nextjs_app_bucket.bucket
  key    = "nextjs-app.zip" # Your zipped code
  source = "path/to/your/nextjs-app.zip" # Change to the path of your zipped application code
}

# Elastic Beanstalk Application
resource "aws_elastic_beanstalk_application" "nextjs_app" {
  name        = "my-nextjs-app"
  description = "My Next.js Application"
}

# Elastic Beanstalk Environment
resource "aws_elastic_beanstalk_environment" "nextjs_app_env" {
  name                = "my-nextjs-app-env"
  application         = aws_elastic_beanstalk_application.nextjs_app.name
  solution_stack_name = "64bit Amazon Linux 2 v5.4.4 running Node.js 14" # Choose the appropriate solution stack

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NODE_ENV"
    value     = "production"
  }

  # Other settings like database configuration can be added here
}

# Optionally add an RDS instance for the database
# ...

