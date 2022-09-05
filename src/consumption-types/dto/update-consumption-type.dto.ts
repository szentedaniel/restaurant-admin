import { PartialType } from '@nestjs/swagger';
import { CreateConsumptionTypeDto } from './create-consumption-type.dto';

export class UpdateConsumptionTypeDto extends PartialType(CreateConsumptionTypeDto) {}
