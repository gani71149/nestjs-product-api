import { IsNumber } from 'class-validator';

export class PurchaseProductDto {
  @IsNumber()
    quantity!: number;
}