import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class CreateRestaurantDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    nameEn!: string;

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    nameAr!: string;

    @IsString({ message: 'Slug must be a string' })
    @IsNotEmpty({ message: 'Slug is required' })
    slug!: string;

    @IsArray({ message: 'Cuisines must be an array' })
    @ArrayMinSize(1, { message: 'At least one cuisine is required' })
    @ArrayMaxSize(3, { message: 'No more than 3 cuisines are allowed' })
    @IsString({ each: true, message: 'Each cuisine must be a string' })
    cuisines!: string[];

    @ValidateNested()
    @Type(() => LocationDto)
    location!: LocationDto;
}
