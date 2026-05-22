import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsMongoId()
  @IsNotEmpty()
  restaurantId!: string;
}