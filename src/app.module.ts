import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArticleModule from './articles/article.module';
import AuthorModule from './authors/author.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        port: config.get<number>('POSTGRES_PORT'),
        entities: [`${__dirname}dist/**/**/*.entity{.ts,.js}`],
        migrations: ['dist/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    AuthorModule,
    ArticleModule,
  ],
  providers: [],
  controllers: [],
})
export default class AppModule {}
