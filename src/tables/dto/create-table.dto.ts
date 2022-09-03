/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTableDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ferohely: number

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  elerheto: boolean
}
