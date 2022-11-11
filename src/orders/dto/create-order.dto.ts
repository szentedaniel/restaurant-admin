/* eslint-disable indent */
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  etterem_id: number

  @ApiProperty()
  asztal_id: number | null

  // @ApiPropertyOptional()
  // @IsString()
  // @IsOptional()
  // @ApiHideProperty()
  // kupon: string | undefined

  @ApiProperty()
  @IsBoolean()
  fizetes_most: boolean

  @ApiProperty()
  @IsNumber()
  fizetesi_mod_id: number

  @ApiProperty()
  @IsNumber()
  fogyasztasi_mod_id: number

  @ApiProperty()
  @IsArray()
  termekek: Array<Termek>
}

class Termek {
  @ApiProperty()
  @IsNumber()
  termek_id: number

  @ApiProperty()
  @IsNumber()
  darab: number
}
