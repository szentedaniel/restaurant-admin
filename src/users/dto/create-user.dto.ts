/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  etterem_id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone: string | null
}
