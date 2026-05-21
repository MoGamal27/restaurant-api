import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class LocationDto {
    @IsString({ message: 'Type must be a string' })
    @IsNotEmpty({ message: 'Type is required' })
    type!: 'Point';

    @IsNotEmpty({ message: 'Coordinates are required' })
    @IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
    coordinates!: number[]; // [long, lat]

}  
