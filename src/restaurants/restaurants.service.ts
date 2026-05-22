import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { generateUniqueSlug } from '../utils/slug.util';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(dto: CreateRestaurantDto): Promise<RestaurantDocument> {

    // generate slug
    const slug = await generateUniqueSlug(dto.nameEn, this.restaurantModel);

    const restaurant = new this.restaurantModel({
      nameEn:     dto.nameEn,
      nameAr:     dto.nameAr,
      slug,                  
      cuisines:   dto.cuisines,
      location: {
        type: dto.location.type || 'Point',
        coordinates: dto.location.coordinates,
      },
    });

    return restaurant.save();
  }

 async findAll(cuisine?: string) {
  const filter = cuisine ? { cuisines: cuisine } : {};
  return this.restaurantModel.find(filter).exec();
}


async findOne(idOrSlug: string) {
  const isObjectId = Types.ObjectId.isValid(idOrSlug);

  const filter = isObjectId
    ? { _id: idOrSlug }
    : { slug: idOrSlug };

  return this.restaurantModel.findOne(filter).exec();
}
}