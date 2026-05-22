import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class LocationDto {
    
    @IsNotEmpty({ message: 'Coordinates are required' })
    @IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
    coordinates!: number[]; // [long, lat]

}  
