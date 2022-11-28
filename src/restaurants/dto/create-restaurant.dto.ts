/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRestaurantDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city_name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional()
  @IsOptional()
  leiras: LeirasDto[] | undefined

  @ApiPropertyOptional()
  @IsOptional()
  aktiv: boolean | undefined

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adoszam: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lat: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lng: number

  @ApiPropertyOptional()
  @IsOptional()
  telefon: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  email: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  nyitvatartas: Prisma.JsonObject | undefined

  @ApiPropertyOptional()
  @IsOptional()
  weblap: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  img_path: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  img_bg_path: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  ceg: string | undefined

  @ApiPropertyOptional()
  @IsOptional()
  languages: Array<string> | undefined

  @ApiPropertyOptional()
  @IsOptional()
  fogyasztasi_modok: Array<number> | undefined
}


export class LeirasDto {
  nyelv_id: number
  text: string
}