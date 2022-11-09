/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

  @ApiPropertyOptional()
  kategoria_id: number | undefined

  @ApiProperty()
  @IsNumber()
  ar_forint: number

  @ApiPropertyOptional()
  @IsNumber()
  ar_euro: number | undefined

  @ApiPropertyOptional()
  img_path: string | undefined

  @ApiProperty()
  @IsBoolean()
  elerheto: boolean

  @ApiProperty()
  @IsArray()
  fordito: Array<TermekFordito>

  @ApiProperty()
  @IsArray()
  allergenek: Array<number>
}

export class TermekFordito {

  @ApiProperty()
  @IsNumber()
  nyelv_id: number

  @ApiProperty()
  @IsString()
  termek_nev: string

  @ApiPropertyOptional()
  termek_leiras: string | undefined
}

export class toggleAvailableDto {
  @ApiProperty()
  @IsBoolean()
  elerheto: boolean
}