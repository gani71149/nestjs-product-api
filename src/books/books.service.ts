import { Body, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    private books = [
        { id: 1, title: 'Book A', author: 'Author A' },
        { id: 2, title: 'Book B', author: 'Author B' },
    ];

    findAll() {
        return this.books;
    }

    findOne(id: number) {
        const book = this.books.find(b => b.id === id);
        if (!book) {
            throw new Error('Book not found'); // IMPORTANT (Task 05)
        }
        return book;
    }

    create(createBookDto: CreateBookDto) {
        const booksByHighestId = [...this.books].sort( (a, b) => b.id - a.id );

        const newBook = { id: booksByHighestId[0].id + 1, ...createBookDto };
        this.books.push(newBook);
        return newBook;
    }
}
