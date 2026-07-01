variable "aws_region" {
  type        = string
  description = "Região AWS padrão para provisionamento"
  default     = "us-east-1"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block para a VPC principal"
  default     = "10.0.0.0/16"
}

variable "environment" {
  type        = string
  description = "Identificador do ambiente de deployment"
  default     = "production"
}
