/*
1. Why is @UseFilters(ProductsExceptionFilter) placed on the controller class rather than registered inside main.ts?

Because this filter should only affect ProductsController routes.
If registered globally in main.ts, it would affect the entire application.

-----------------------------------------------------

2. If both GlobalHttpExceptionFilter (global) and ProductsExceptionFilter (scoped)
can catch NotFoundException, which one runs for GET /products/99, and why?

ProductsExceptionFilter runs first because scoped filters
(controller/method level) take precedence over global filters.

-----------------------------------------------------

3. What is the difference between handling errors in an interceptor via catchError()
versus using an Exception Filter?

Interceptor:
- Handles errors inside request/response stream
- Uses RxJS catchError()
- Good for transforming/logging errors

Exception Filter:
- Handles thrown exceptions centrally
- Shapes final HTTP response
- Best for custom error responses
*/

import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class ProductsExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(404).json({
      success: false,
      statusCode: 404,
      error: exception.message,
      suggestion:
        'Check the product ID or view all products at GET /products',
    });
  }
}