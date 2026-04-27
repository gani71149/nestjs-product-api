/**
 * ANSWERS:
 *
 * 1. Why controller-level?
 * → To apply this filter ONLY to ProductsController, not globally.
 *
 * 2. Which filter runs?
 * → ProductsExceptionFilter runs first because it is more specific (scoped).
 *
 * 3. Interceptor vs Filter?
 * → Interceptor handles stream (before/after).
 * → Filter handles thrown exceptions only.
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