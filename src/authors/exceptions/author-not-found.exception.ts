import { HttpStatus, HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class AuthorNotFoundException extends HttpException {
  static statusCode: number = HttpStatus.NOT_FOUND;

  static message: string = 'Author not found';

  @ApiProperty({ required: true, example: AuthorNotFoundException.statusCode })
    statusCode: number = AuthorNotFoundException.statusCode;

  @ApiProperty({ required: true, example: AuthorNotFoundException.message })
    message: string = AuthorNotFoundException.message;

  constructor() {
    super(AuthorNotFoundException.message, AuthorNotFoundException.statusCode);
  }
}
