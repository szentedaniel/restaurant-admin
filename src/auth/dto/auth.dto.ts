/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

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
  role: Array<string> | undefined
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
  role: Array<string> | undefined

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  restaurantName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taxNumber: number

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

