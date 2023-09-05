import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UpdateArticleDto {
  @ApiProperty({ example: 'Example title', description: 'title', required: false })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly title?: string;

  @ApiProperty({ example: 'Example description', description: 'article text', required: false })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly text?: string;

  @ApiProperty({ example: 1, description: 'author id', required: false })
  @IsOptional()
  @IsString({ message: 'Must be a number' })
  readonly authorId?: number;
}
