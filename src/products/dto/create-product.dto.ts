import { IsString, IsNumber, IsEnum, isNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsEnum(['ELECTRONICS', 'CLOTHING', 'FOOTWEAR', 'ACCESSORIES'])
  category!: string;

  @IsNumber()
  stock!: number;
}