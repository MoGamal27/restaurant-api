import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { RestaurantSchema } from '../restaurants/restaurants.schema';
import { UserFollowsRestaurant, UserFollowsRestaurantSchema } from './user-follow-restaurant.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Restaurant', schema: RestaurantSchema },
        { name: UserFollowsRestaurant.name, schema: UserFollowsRestaurantSchema },
      ]),
    ],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
