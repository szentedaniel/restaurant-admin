/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { user } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthSignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ enum: ['owner', 'admin', 'staff', 'user'], default: 'user' })
  @IsOptional()
  roles: string | undefined
}

export class AuthSignInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}


export class AuthSignInResOk {
  @ApiProperty()
  user: user

  @ApiProperty()
  access_token: string
}