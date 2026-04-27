import { HttpException, HttpStatus } from '@nestjs/common';

export class OutOfStockException extends HttpException {
  constructor(
    productName: string,
    requestedQuantity: number,
    availableStock: number,
  ) {
    super(
      {
        success: false,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `Cannot order ${requestedQuantity} units of '${productName}' — only ${availableStock} in stock`,
        productName,
        requestedQuantity,
        availableStock,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}