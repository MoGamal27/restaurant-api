import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: ['Asian', 'Burgers'], description: 'Favorite cuisines' })
  @IsArray()
  @IsString({ each: true })
  favoriteCuisines!: string[];
}
