import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantsService.create(dto);
  }

 @Get()
 @ApiOperation({ summary: 'List all restaurants with optional cuisine filter' })
 findAll(@Query('cuisine') cuisine?: string) {
  return this.restaurantsService.findAll(cuisine);
}

@Get('nearby')
@ApiOperation({ summary: 'Find restaurants within 1KM radius' })
findNearby(
  @Query('lng') lng: string,
  @Query('lat') lat: string,
) {
  return this.restaurantsService.findNearby(
    parseFloat(lng),
    parseFloat(lat),
  );
}

@Get(':idOrSlug')
@ApiOperation({ summary: 'Get restaurant details by ID or slug' })
findOne(@Param('idOrSlug') idOrSlug: string) {
  return this.restaurantsService.findOne(idOrSlug);
}
}