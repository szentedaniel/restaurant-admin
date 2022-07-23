/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class FileuploadDto {
  @ApiProperty()
  @IsNotEmpty()
  image: Express.Multer.File
}