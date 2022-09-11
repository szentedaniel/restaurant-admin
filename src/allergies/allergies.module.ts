import { Global, Module } from '@nestjs/common'
import { AllergiesService } from './allergies.service'
import { AllergiesController } from './allergies.controller'

@Global()
@Module({
  controllers: [AllergiesController],
  providers: [AllergiesService],
  exports: [AllergiesService]
})
export class AllergiesModule { }
