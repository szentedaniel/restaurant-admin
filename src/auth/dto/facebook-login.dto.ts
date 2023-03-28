/* eslint-disable indent */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class FacebookLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
}