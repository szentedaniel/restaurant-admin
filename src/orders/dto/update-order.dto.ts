/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class UpdateOrderDto {
  @ApiProperty()
  @IsNumber()
  status_id: number
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
