/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber } from 'class-validator'

export class UpdateOrderDto {
  @ApiProperty()
  @IsNumber()
  statusz_id: number
}

export class UpdateOrderProductDto {
  @ApiProperty()
  @IsNumber()
  darab: number

  @ApiProperty()
  @IsBoolean()
  canceled: boolean
}

export class PayRequiredDto {
  @ApiProperty()
  @IsNumber()
  etterem_id: number

  @ApiProperty()
  @IsNumber()
  fizetesi_mod_id: number
}

export class myCartDto {
  @ApiProperty()
  @IsNumber()
  etterem_id: number
}
