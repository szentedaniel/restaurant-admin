import { Global, Module } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { RestaurantsController } from './restaurants.controller'

@Global()
@Module({
  controllers: [RestaurantsController],
  exports: [RestaurantsService],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
