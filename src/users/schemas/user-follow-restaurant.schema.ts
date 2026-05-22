import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type UserFollowsRestaurantDocument = HydratedDocument<UserFollowsRestaurant>;

@Schema({ timestamps: true })
export class UserFollowsRestaurant {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId!: Types.ObjectId;
}

export const UserFollowsRestaurantSchema = SchemaFactory.createForClass(UserFollowsRestaurant);


