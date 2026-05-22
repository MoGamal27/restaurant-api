import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantsService.create(dto);
  }

 @Get()
 findAll(@Query('cuisine') cuisine?: string) {
  return this.restaurantsService.findAll(cuisine);
}
}