import { Module } from '@nestjs/common'
import { FileuploadController } from './fileupload.controller'
import { FileuploadService } from './fileupload.service'

@Module({
  providers: [FileuploadService],
  controllers: [FileuploadController]
})
export class FileuploadModule { }
