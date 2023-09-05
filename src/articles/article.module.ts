import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArticlesController from './article.controller';
import ArticleEntity from './entities/article.entity';
import ArticleService from './article.service';
import AuthorEntity from '../authors/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, AuthorEntity]),
  ],
  providers: [
    ArticleService,
  ],
  controllers: [ArticlesController],
})
export default class ArticleModule {}
