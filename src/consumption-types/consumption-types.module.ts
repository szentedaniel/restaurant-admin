import { Global, Module } from '@nestjs/common'
import { ConsumptionTypesService } from './consumption-types.service'
import { ConsumptionTypesController } from './consumption-types.controller'

@Global()
@Module({
  controllers: [ConsumptionTypesController],
  providers: [ConsumptionTypesService],
  exports: [ConsumptionTypesService]
})
export class ConsumptionTypesModule { }
