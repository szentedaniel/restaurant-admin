import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthSignUpDto {
  @IsEmail()
  @IsNotEmpty()
    email: string

  @IsString()
  @IsNotEmpty()
    password: string

  @IsString()
  @IsNotEmpty()
    name: string
}

export class AuthSignInDto {
  @IsEmail()
  @IsNotEmpty()
    email: string

  @IsString()
  @IsNotEmpty()
    password: string
}