output "vpc_id" {
  description = "ID da VPC principal criada"
  value       = aws_vpc.main.id
}

output "ecs_cluster_name" {
  description = "Nome do Cluster ECS criado"
  value       = aws_ecs_cluster.main.name
}

output "ecs_security_group_id" {
  description = "ID do Security Group associado ao ECS Fargate"
  value       = aws_security_group.ecs_sg.id
}

output "public_subnets" {
  description = "Lista dos IDs das subnets públicas criadas"
  value       = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}
