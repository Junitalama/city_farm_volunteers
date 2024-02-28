terraform {
  required_providers {
    aws = {                                    
      source  = "hashicorp/aws"                
                        
    }
  }
  required_version = ">= 1.0.0"                
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_security_group" "farm_city" {
  name        = "farm_city_security_group"
  description = "Allow ports 22, 8080, and 5000"

 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

 
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "city_farm" {
  instance_type          = "t2.micro"
  ami                    = "ami-0ff1c68c6e837b183"
  vpc_security_group_ids = ["sg-07dc9cff6004048cb"]
  key_name               = "junita-city-farm" 


  tags = {
    Name = "farm-city-volunteers"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"  
      private_key = file("/Users/junitalama/Downloads/junita-city-farm.pem")
      host        = self.public_ip
    }
inline = [
      "sudo npm update -y",
      "sudo npm install docker -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]

  
}
    
  }
