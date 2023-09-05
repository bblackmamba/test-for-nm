import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ArticleService from './article.service';
import { FindAllEntitiesDto, StatusDto } from '../common/dto';
import { Articles, CreateArticleDto } from './dto';
import ArticleEntity from './entities/article.entity';
import { ArticleNotFoundException } from './exceptions';
import AuthorEntity from '../authors/entities/author.entity';
import UpdateArticleDto from './dto/update-article.dto';

@Controller('articles')
@ApiTags('articles')
@UseInterceptors(ClassSerializerInterceptor)
export default class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ description: 'Get articles by options' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles',
    type: Articles,
  })
  @Get()
  findAll(
    @Query() findDto: FindAllEntitiesDto,
  ): Promise<Articles> {
    return this.articleService.getAll(findDto);
  }

  @ApiOperation({ description: 'Get article' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article',
    type: ArticleEntity,
  })
  @ApiResponse({
    status: ArticleNotFoundException.statusCode,
    description: ArticleNotFoundException.message,
    type: ArticleNotFoundException,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  findById(
    @Param('id') id: string,
  ): Promise<ArticleEntity> {
    return this.articleService.getById(Number(id));
  }

  @ApiOperation({ description: 'Create article' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created article',
    type: ArticleEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.create(createArticleDto);
  }

  @ApiOperation({ description: 'Updated author' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updated author',
    type: AuthorEntity,
  })
  @ApiResponse({
    status: ArticleNotFoundException.statusCode,
    description: ArticleNotFoundException.message,
    type: ArticleNotFoundException,
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  update(
    @Param('id') id: string,
      @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.update(Number(id), updateArticleDto);
  }

  @ApiOperation({ description: 'Delete author' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status',
    type: StatusDto,
  })
  @ApiResponse({
    status: ArticleNotFoundException.statusCode,
    description: ArticleNotFoundException.message,
    type: ArticleNotFoundException,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  delete(
    @Param('id') id: string,
  ): Promise<StatusDto> {
    return this.articleService.delete(Number(id));
  }
}
