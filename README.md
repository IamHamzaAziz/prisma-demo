# Prisma & Express

A backend using Express.js, TypeScript and Prisma ORM for MySQL database.

## Features

- Express.js server
- Prisma ORM with MySQL
- TypeScript support
- Easy Prisma migrations
- Environment variables for DB config
- Relations between tables (User → Posts)
- Simple CRUD for both models
- Pagination example

## Initialize Prisma
```
npx prisma init
```

This creates:
- .env
- prisma/schema.prisma

## Creating Models

Example:

In prisma/schema.prisma

```
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  age       Int?
  createdAt DateTime @default(now())

  posts     Post[]
}

model Post {
  id         String   @id @default(uuid())
  title      String
  content    String?
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## Generate Migration

After editing schema.prisma:

```
npx prisma migrate dev --name init
```

Replace init with any other name of migration like add-age-column-in-users-table

This:

- Applies changes to the database
- Saves migration files in prisma/migrations

## Generate Prisma Client
```
npx prisma generate
```

Needed anytime after schema changes.

## Open Prisma Studio
GUI to view database:

```
npx prisma studio
```
