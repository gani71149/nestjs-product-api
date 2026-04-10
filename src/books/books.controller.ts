import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { ErrorMappingInterceptor } from 'src/interceptors/error.interceptor';

@Controller('books')
@UseInterceptors(TransformInterceptor) // TASK 03
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseInterceptors(CacheInterceptor) // TASK 04
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ErrorMappingInterceptor) // TASK 05
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
}
