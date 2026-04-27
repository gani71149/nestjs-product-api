import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsExceptionFilter } from 'src/common/filters/products-exception.filter';
import { ApiOperation } from '@nestjs/swagger';
import { PurchaseProductDto } from './dto/purchase-product.dto';

@UseFilters(ProductsExceptionFilter)
@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Get() // GET /products?category=ELECTRONICS
  findAll(
    @Query('category')
    category?: 'ELECTRONICS' | 'CLOTHING' | 'FOOTWEAR' | 'ACCESSORIES',
  ) {
    return this.prodService.findAll(category);
  }

  @Get(':id') // GET /products/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prodService.findOne(id);
  }

  @Post() // POST /products
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    return this.prodService.create(createProductDto);
  }

  @Post(':id/purchase')
  @ApiOperation({ summary: 'Purchase a product by ID' })
  purchase(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PurchaseProductDto
  ) {
    return this.prodService.purchaseProduct(id, body.quantity);
  }
}
