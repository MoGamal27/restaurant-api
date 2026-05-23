import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
    @ApiProperty({ example: 'Point', enum: ['Point'] })
    @IsString({ message: 'Type must be a string' })
    @IsNotEmpty({ message: 'Type is required' })
    type!: 'Point';

    @ApiProperty({ example: [31.2357, 30.0444], description: '[longitude, latitude]' })
    @IsNotEmpty({ message: 'Coordinates are required' })
    @IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
    coordinates!: number[]; // [long, lat]
}  
