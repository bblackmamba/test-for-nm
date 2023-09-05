import { ApiProperty } from '@nestjs/swagger';
import AuthorEntity from '../entities/author.entity';

export default class AuthorsDto {
  @ApiProperty({ type: [AuthorEntity] })
    rows: AuthorEntity[];

  @ApiProperty({ example: '1' })
    count: number;
}
