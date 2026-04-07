import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

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
}
