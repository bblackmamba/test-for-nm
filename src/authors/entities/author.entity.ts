import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import ArticleEntity from '../../articles/entities/article.entity';

@Entity('authors')
export default class AuthorEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    avatarUrl?: string;

  @Column()
    name: string;

  @OneToMany(() => ArticleEntity, (article) => article.author)
    articles: ArticleEntity[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn()
    deletedAt: Date;
}
