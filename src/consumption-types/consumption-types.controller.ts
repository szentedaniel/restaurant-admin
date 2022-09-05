import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumptionTypesService } from './consumption-types.service';
import { CreateConsumptionTypeDto } from './dto/create-consumption-type.dto';
import { UpdateConsumptionTypeDto } from './dto/update-consumption-type.dto';

@Controller('consumption-types')
export class ConsumptionTypesController {
  constructor(private readonly consumptionTypesService: ConsumptionTypesService) {}

  @Post()
  create(@Body() createConsumptionTypeDto: CreateConsumptionTypeDto) {
    return this.consumptionTypesService.create(createConsumptionTypeDto);
  }

  @Get()
  findAll() {
    return this.consumptionTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumptionTypeDto: UpdateConsumptionTypeDto) {
    return this.consumptionTypesService.update(+id, updateConsumptionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionTypesService.remove(+id);
  }
}
