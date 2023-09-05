import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthorService from './author.service';
import { FindAllEntitiesDto, StatusDto } from '../common/dto';
import { AuthorNotFoundException } from './exceptions';
import AuthorEntity from './entities/author.entity';
import { CreateAuthorDto, AuthorsDto, UpdateAuthorDto } from './dto';

@Controller('authors')
@ApiTags('authors')
export default class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ description: 'Get authors by options' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authors',
    type: AuthorsDto,
  })
  @Get()
  findAll(
    @Query() findDto: FindAllEntitiesDto,
  ): Promise<AuthorsDto> {
    return this.authorService.getAll(findDto);
  }

  @ApiOperation({ description: 'Get author' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Author',
    type: AuthorEntity,
  })
  @ApiResponse({
    status: AuthorNotFoundException.statusCode,
    description: AuthorNotFoundException.message,
    type: AuthorNotFoundException,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  findById(
    @Param('id') id: string,
  ): Promise<AuthorEntity> {
    return this.authorService.getById(Number(id));
  }

  @ApiOperation({ description: 'Create author' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created author',
    type: AuthorEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.authorService.create(createAuthorDto);
  }

  @ApiOperation({ description: 'Updated author' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updated author',
    type: AuthorEntity,
  })
  @ApiResponse({
    status: AuthorNotFoundException.statusCode,
    description: AuthorNotFoundException.message,
    type: AuthorNotFoundException,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  update(
    @Param('id') id: string,
      @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.authorService.update(Number(id), updateAuthorDto);
  }

  @ApiOperation({ description: 'Delete author' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status',
    type: StatusDto,
  })
  @ApiResponse({
    status: AuthorNotFoundException.statusCode,
    description: AuthorNotFoundException.message,
    type: AuthorNotFoundException,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  delete(
    @Param('id') id: string,
  ): Promise<StatusDto> {
    return this.authorService.delete(Number(id));
  }
}
