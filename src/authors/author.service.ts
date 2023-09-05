import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthorEntity from './entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { AuthorNotFoundException } from './exceptions';
import { FindAllEntitiesDto, StatusDto } from '../common/dto';
import AuthorsDto from './dto/authors.dto';
import ArticleEntity from '../articles/entities/article.entity';

@Injectable()
export default class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async getAll(findDto: FindAllEntitiesDto): Promise<AuthorsDto> {
    const [rows, count] = await this.authorRepository.findAndCount({
      where: {
        deletedAt: null,
      },
      order: { createdAt: 'asc' },
      skip: (findDto.page - 1) * findDto.take,
      take: findDto.take,
    });

    return { rows, count };
  }

  async getById(id: number): Promise<AuthorEntity> {
    const authorEntity = await this.authorRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!authorEntity) {
      throw new AuthorNotFoundException();
    }

    return authorEntity;
  }

  async create(createDto: CreateAuthorDto): Promise<AuthorEntity> {
    const authorEntity = await this.authorRepository.save(createDto);

    return authorEntity;
  }

  async update(id: number, updateDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const authorEntity = await this.authorRepository.findOne({ where: { id } });

    if (!authorEntity) {
      throw new AuthorNotFoundException();
    }

    await this.authorRepository.update({ id }, { ...updateDto });

    return this.authorRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<StatusDto> {
    const authorEntity = await this.authorRepository.findOne({ where: { id } });

    if (!authorEntity) {
      throw new AuthorNotFoundException();
    }

    await this.articleRepository.softDelete({
      authorId: authorEntity.id,
    });

    await this.authorRepository.softDelete({
      id: authorEntity.id,
    });

    return { status: true };
  }
}
