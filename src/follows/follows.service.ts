import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserFollowsRestaurant,
  UserFollowsRestaurantDocument,
} from './user-follow-restaurant.schema';
import { CreateFollowDto } from './dto/create-follow.dto';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(UserFollowsRestaurant.name)
    private followModel: Model<UserFollowsRestaurantDocument>,

    @InjectModel('User')
    private userModel: Model<any>,

    @InjectModel('Restaurant')
    private restaurantModel: Model<any>,
  ) {}

  async follow(dto: CreateFollowDto) {
    const { userId, restaurantId } = dto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantId} not found`);
    }

    const existing = await this.followModel.findOne({
      userId:       new Types.ObjectId(userId),
      restaurantId: new Types.ObjectId(restaurantId),
    });

    if (existing) {
      throw new ConflictException('User already follows this restaurant');
    }

    const follow = new this.followModel({
      userId:       new Types.ObjectId(userId),
      restaurantId: new Types.ObjectId(restaurantId),
    });

    return follow.save();
  }
}