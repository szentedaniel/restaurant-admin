import { Test, TestingModule } from '@nestjs/testing'
import { ConsumptionTypesController } from './consumption-types.controller'
import { ConsumptionTypesService } from './consumption-types.service'

describe('ConsumptionTypesController', () => {
  let controller: ConsumptionTypesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionTypesController],
      providers: [ConsumptionTypesService],
    }).compile()

    controller = module.get<ConsumptionTypesController>(ConsumptionTypesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
