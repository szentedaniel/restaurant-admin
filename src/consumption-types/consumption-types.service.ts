import { Injectable } from '@nestjs/common';
import { CreateConsumptionTypeDto } from './dto/create-consumption-type.dto';
import { UpdateConsumptionTypeDto } from './dto/update-consumption-type.dto';

@Injectable()
export class ConsumptionTypesService {
  create(createConsumptionTypeDto: CreateConsumptionTypeDto) {
    return 'This action adds a new consumptionType';
  }

  findAll() {
    return `This action returns all consumptionTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionType`;
  }

  update(id: number, updateConsumptionTypeDto: UpdateConsumptionTypeDto) {
    return `This action updates a #${id} consumptionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumptionType`;
  }
}
