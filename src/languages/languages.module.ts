import { Global, Module } from '@nestjs/common'
import { LanguagesService } from './languages.service'
import { LanguagesController } from './languages.controller'

@Global()
@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService]
})
export class LanguagesModule { }
