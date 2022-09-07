import { Test, TestingModule } from '@nestjs/testing'
import { ConsumptionTypesService } from './consumption-types.service'

describe('ConsumptionTypesService', () => {
  let service: ConsumptionTypesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionTypesService],
    }).compile()

    service = module.get<ConsumptionTypesService>(ConsumptionTypesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
