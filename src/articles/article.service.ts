import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import AuthorEntity from '../authors/entities/author.entity';
import { FindAllEntitiesDto, StatusDto } from '../common/dto';
import { AuthorNotFoundException } from '../authors/exceptions';
import ArticleEntity from './entities/article.entity';
import { Articles, CreateArticleDto } from './dto';
import UpdateArticleDto from './dto/update-article.dto';
import ArticleNotFoundException from './exceptions/article-not-found.exception';

@Injectable()
export default class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async getAll(findDto: FindAllEntitiesDto): Promise<Articles> {
    const [rows, count] = await this.articleRepository.findAndCount({
      relations: {
        author: true,
      },
      where: {
        deletedAt: IsNull(),
      },
      order: { createdAt: findDto.order || 'asc' },
      skip: (findDto.page - 1) * findDto.take,
      take: findDto.take,
    });

    return { rows, count };
  }

  async getById(id: number): Promise<ArticleEntity> {
    const articleEntity = await this.articleRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      relations: ['author'],
    });

    if (!articleEntity) {
      throw new ArticleNotFoundException();
    }

    return articleEntity;
  }

  async create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const authorEntity = await this.authorRepository.findOne({
      where: {
        id: createArticleDto.authorId,
      },
    });
    if (!authorEntity) {
      throw new AuthorNotFoundException();
    }

    const articleEntity = await this.articleRepository.save({
      text: createArticleDto.text,
      title: createArticleDto.title,
      author: authorEntity,
    });

    return articleEntity;
  }

  async update(id: number, updateDto: UpdateArticleDto): Promise<ArticleEntity> {
    const articleEntity = await this.articleRepository.findOne({
      where: {
        id,
        deletedAt: Not(null),
        author: {
          deletedAt: Not(null),
        },
      },
    });

    if (!articleEntity) {
      throw new ArticleNotFoundException();
    }

    const partialEntity: QueryPartialEntity<ArticleEntity> = {
      ...(updateDto.title ? { title: updateDto.title } : {}),
      ...(updateDto.text ? { text: updateDto.text } : {}),
    };

    if (updateDto.authorId && updateDto.authorId !== articleEntity.authorId) {
      const authorEntity = await this.authorRepository.findOne({
        where: {
          id: updateDto.authorId,
        },
      });
      if (!authorEntity) {
        throw new AuthorNotFoundException();
      }

      partialEntity.author = authorEntity;
    }

    await this.articleRepository.update(
      {
        id: articleEntity.id,
      },
      partialEntity,
    );

    const result = await this.articleRepository.findOne({ where: { id } });

    return result;
  }

  async delete(id: number): Promise<StatusDto> {
    const articleEntity = await this.articleRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!articleEntity) {
      throw new ArticleNotFoundException();
    }

    await this.articleRepository.softDelete({
      id: articleEntity.id,
    });

    return { status: true };
  }
}
