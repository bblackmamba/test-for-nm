import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export default class UpdateAuthorDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'mail' })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ example: 'username', description: 'name' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 45, { message: 'Not less than 4 and not more than 50' })
  @IsOptional()
  readonly avatarUrl: string;
}
