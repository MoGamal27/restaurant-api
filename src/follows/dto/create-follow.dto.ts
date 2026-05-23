import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ example: '60d5ecb74f158711e8888888', description: 'User MongoDB ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: '60d5ecb74f158711e8888889', description: 'Restaurant MongoDB ID' })
  @IsMongoId()
  @IsNotEmpty()
  restaurantId!: string;
}