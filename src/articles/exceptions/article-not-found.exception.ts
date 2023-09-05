import { HttpStatus, HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class ArticleNotFoundException extends HttpException {
  static statusCode: number = HttpStatus.NOT_FOUND;

  static message: string = 'Article not found';

  @ApiProperty({ required: true, example: ArticleNotFoundException.statusCode })
    statusCode: number = ArticleNotFoundException.statusCode;

  @ApiProperty({ required: true, example: ArticleNotFoundException.message })
    message: string = ArticleNotFoundException.message;

  constructor() {
    super(ArticleNotFoundException.message, ArticleNotFoundException.statusCode);
  }
}
