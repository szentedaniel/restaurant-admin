import { Global, Module } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { RestaurantsController } from './restaurants.controller'
import { restaurantsForOwnerController } from './restaurantsForOwner.controller'

@Global()
@Module({
  controllers: [RestaurantsController, restaurantsForOwnerController],
  exports: [RestaurantsService],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
