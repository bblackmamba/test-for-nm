import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import AuthorEntity from '../../authors/entities/author.entity';

@Entity('articles')
export default class ArticleEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title?: string;

  @Column()
    text: string;

  @Column()
    authorId: number;

  @ManyToOne(() => AuthorEntity)
  @JoinColumn({ name: 'authorId' })
    author: AuthorEntity;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn()
    deletedAt: Date;
}
