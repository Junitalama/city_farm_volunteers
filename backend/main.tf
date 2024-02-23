provider "aws" {
  region = "eu-west-2"
}

resource "aws_instance" "farm_city" {
  ami                     = "ami-0ff1c68c6e837b183"
  instance_type           = "t3.micro"
  key_name                = "junita-city-farm"
  vpc_security_group_ids  = ["sg-07dc9cff6004048cb"]
}
