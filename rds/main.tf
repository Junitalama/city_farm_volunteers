

provider "aws" {
  region = "eu-west-2"  
}

resource "aws_db_instance" "junita" {
  
  identifier            = "junita"
  allocated_storage     = 20 
  engine                = "postgres"
  engine_version        = "15.5"
  instance_class        = "db.t3.micro"
  db_name               = "junita_lama"
  username              = "postgres"
  password              = "password"
  parameter_group_name  = "default.postgres15"
  publicly_accessible   = true

  vpc_security_group_ids = ["sg-07dc9cff6004048cb"]  
 
}
