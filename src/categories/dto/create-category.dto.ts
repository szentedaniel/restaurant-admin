/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCategoryDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  parentId: number | undefined

  @IsArray()
  @ApiProperty()
  nev: kategoriak_fordito[]
}

class kategoriak_fordito {

  @IsNumber()
  @ApiProperty()
  nyelv_id: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nev: string
}