/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

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
