import { ApiProperty } from '@nestjs/swagger';
import ArticleEntity from '../entities/article.entity';

export default class AuthorsDto {
  @ApiProperty({ type: [ArticleEntity] })
    rows: ArticleEntity[];

  @ApiProperty({ example: '1' })
    count: number;
}
