import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      price: 60000,
      category: 'ELECTRONICS'
    },
    {
      id: 2,
      name: 'Mobile',
      price: 20000,
      category: 'ELECTRONICS'
    },
    {
      id: 3,
      name: 'Shirt',
      price: 1500,
      category: 'CLOTHING'
    },
    {
      id: 4,
      name: 'Shoes',
      price: 3000,
      category: 'FOOTWEAR'
    },
    {
      id: 5,
      name: 'Watch',
      price: 2500,
      category: 'ACCESSORIES'
    }
  ];

  findAll(category?: 'ELECTRONICS' | 'CLOTHING' | 'FOOTWEAR' | 'ACCESSORIES') {
    if (category) {
      const filteredProducts = this.products.filter( product => product.category === category );

      if (filteredProducts.length === 0) {
        throw new NotFoundException('Product Category Not Found');
      }

      return filteredProducts;
    }

    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return product;
  }

  create(createProductDto: CreateProductDto) {
    const productsByHighestId = [...this.products].sort( (a, b) => b.id - a.id );

    const newProduct = {
      id: productsByHighestId[0].id + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);

    return newProduct;
  }
}
