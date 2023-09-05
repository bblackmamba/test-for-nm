# NestJS PostgreSQL Typeorm Docker

Простое backend приложение на базе NestJS, где в качестве базы данных выступает PostgreSQL, для управления базой
используется TypeORM. Все это упаковано в docker-compose

## Метод установки и запуска

Скопируйте к себе репозиторий

```shell
git clone 
```

Создайте в корне репозитория .env файл, например:

```dotenv
API_PORT=3001
API_HOST=http://localhost:
TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME=admin
TYPEORM_PASSWORD=123456
TYPEORM_DATABASE=lesson1
TYPEORM_PORT=5432
TYPEORM_HOST=localhost
```

### С использованием Docker

```shell
cp .env.example .env

docker-compose build

docker-compose up
# -d - для запуска в фоне
# --build - для повторной пересборки контейнеров
```

### Без Docker

```shell
# yarn package manager
cp .env.example .env

// замениить в .env POSTGRES_HOST на свой

yarn install
yarn start

# npm package manager
npm install
npm run start
```
