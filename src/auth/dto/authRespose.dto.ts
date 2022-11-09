/* eslint-disable indent */
import { ApiResponseProperty } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"

export class convertedUserDto {

  role: Prisma.JsonValue
  data: {
    displayName: string;
    photoURL: string;
    etterem_id: number;
    email: string;
    shortcuts: any[];
  }
}

export class defaultAuthResponseDto {
  user: convertedUserDto
  access_token: string
  refresh_token: string
}

export class emailVerifyDto {
  status: number
  message: string
}

export class ErrorResonseDto {
  statusCode: number
  message: string
  error: string
}

export class ForgotPasswordSuccessfulResponseDto {
  statusCode: number
  message: string
}