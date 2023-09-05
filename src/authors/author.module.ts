import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthorController from './author.controller';
import AuthorEntity from './entities/author.entity';
import AuthorService from './author.service';
import ArticleEntity from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, ArticleEntity])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export default class AuthorModule {}
