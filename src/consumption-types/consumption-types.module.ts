import { Module } from '@nestjs/common'
import { ConsumptionTypesService } from './consumption-types.service'
import { ConsumptionTypesController } from './consumption-types.controller'

@Module({
  controllers: [ConsumptionTypesController],
  providers: [ConsumptionTypesService]
})
export class ConsumptionTypesModule { }
