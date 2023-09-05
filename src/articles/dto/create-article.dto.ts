import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class CreateArticleDto {
  @ApiProperty({ example: 'Example title', description: 'title' })
  @IsString({ message: 'Must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'Example description', description: 'article text' })
  @IsString({ message: 'Must be a string' })
  readonly text: string;

  @ApiProperty({ example: 1, description: 'author id' })
  @IsNumber()
  readonly authorId: number;
}
