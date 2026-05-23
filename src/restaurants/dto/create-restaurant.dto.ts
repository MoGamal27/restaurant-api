import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
    @ApiProperty({ example: 'The Golden Grill', description: 'Restaurant name in English' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    nameEn!: string;

    @ApiProperty({ example: 'المشويات الذهبية', description: 'Restaurant name in Arabic' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    nameAr!: string;

    @ApiProperty({ example: ['Fried', 'Asian'], description: 'List of cuisines (1-3)' })
    @IsArray({ message: 'Cuisines must be an array' })
    @ArrayMinSize(1, { message: 'At least one cuisine is required' })
    @ArrayMaxSize(3, { message: 'No more than 3 cuisines are allowed' })
    @IsString({ each: true, message: 'Each cuisine must be a string' })
    cuisines!: string[];

    @ApiProperty({ type: () => LocationDto })
    @ValidateNested()
    @Type(() => LocationDto)
    location!: LocationDto;
}
