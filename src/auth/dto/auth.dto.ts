/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

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

  // @ApiPropertyOptional({ enum: ['owner', 'admin', 'staff', 'user'], default: 'user' })
  // @IsOptional()
  // role: string | undefined

  @ApiPropertyOptional()
  phone: string | undefined
}

export class AuthSignUpAdminDto {
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
  role: string | undefined

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  restaurantName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taxNumber: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cityName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lat: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lng: number
}

export class AuthUpdateSettingsDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: number

  @ApiProperty()
  @IsObject()
  @IsOptional()
  settings: object

  @ApiProperty()
  @IsObject()
  @IsOptional()
  shortcuts: object
}

const emailExamples = ['admin@developer.com', 'staff@developer.com', 'user@developer.com']

export class AuthSignInDto {
  @ApiProperty({ examples: emailExamples, example: emailExamples[0] })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'developer' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  remember?: boolean
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  resetToken: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}