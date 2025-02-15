# NestJS Clean Architecture Forum Application

This project is a robust forum application built with NestJS, implementing clean architecture principles and domain-driven design.

The application provides a comprehensive set of features for managing questions, answers, comments, and user interactions within a forum context. It leverages modern technologies and best practices to ensure scalability, maintainability, and testability.

## Repository Structure

The repository is organized into several key directories:

- `src/`: Contains the main application source code
  - `core/`: Core domain logic and shared utilities
  - `domain/`: Domain entities, use cases, and repositories
  - `infra/`: Infrastructure layer (database, HTTP, authentication)
- `test/`: Contains test files and utilities
- `prisma/`: Prisma ORM configuration and migrations

Key Files:
- `src/infra/main.ts`: Application entry point
- `src/infra/http/http.module.ts`: Main HTTP module configuration
- `docker-compose.yml`: Docker configuration for development dependencies
- `vitest.config.ts` and `vitest.config.e2e.ts`: Test configuration files

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- Docker and Docker Compose
- PostgreSQL (v13 or later)
- Redis (v6 or later)

Steps:
1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and fill in the required environment variables
4. Run `docker-compose up -d` to start the PostgreSQL and Redis containers
5. Run `npx prisma migrate deploy` to apply database migrations

### Getting Started

To start the application in development mode:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3333` by default.

### Testing

To run unit tests:

```bash
npm run test
```

To run end-to-end tests:

```bash
npm run test:e2e
```

### Common Use Cases

1. Creating a new question:

```typescript
const response = await axios.post('/questions', {
  title: 'How to use NestJS?',
  content: 'I am new to NestJS and would like to know how to get started.',
  attachments: []
}, {
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

2. Answering a question:

```typescript
const response = await axios.post(`/questions/${questionId}/answers`, {
  content: 'Here's how you can get started with NestJS...',
  attachments: []
}, {
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

3. Fetching recent questions:

```typescript
const response = await axios.get('/questions', {
  params: { page: 1 },
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

### Troubleshooting

Common issues and solutions:

1. Database connection errors:
   - Ensure PostgreSQL is running and accessible
   - Check the `DATABASE_URL` in your `.env` file
   - Run `npx prisma db push` to sync the database schema

2. Authentication issues:
   - Verify that the JWT keys are correctly set in the `.env` file
   - Ensure you're including the `Authorization` header with a valid JWT token

3. Redis connection errors:
   - Confirm Redis is running and accessible
   - Check the Redis configuration in your `.env` file

For more detailed logs, set the `NODE_ENV` to `development` in your `.env` file.

## Data Flow

The application follows a clean architecture pattern, with the following data flow:

1. HTTP Request → Controller
2. Controller → Use Case
3. Use Case → Repository
4. Repository → Database
5. Database → Repository
6. Repository → Use Case
7. Use Case → Controller
8. Controller → HTTP Response

```
[Client] <-> [HTTP Controller] <-> [Use Case] <-> [Repository] <-> [Database]
                                       ^
                                       |
                                   [Domain Entity]
```

The domain entities are at the core of the application, with use cases orchestrating the business logic. Repositories abstract the data access layer, allowing for easy swapping of data sources.

## Deployment

Prerequisites:
- A PostgreSQL database
- A Redis instance
- An S3-compatible object storage (e.g., AWS S3, Cloudflare R2)

Deployment steps:
1. Set up the required infrastructure (database, Redis, object storage)
2. Configure environment variables for the production environment
3. Build the application: `npm run build`
4. Start the application: `npm run start:prod`

For containerized deployments, a Dockerfile is provided. Build and run the Docker image, ensuring to pass the required environment variables.

## Infrastructure

The application relies on the following infrastructure components:

- PostgreSQL (Database):
  - Defined in `docker-compose.yml`
  - Container name: `nest-clean-pg`
  - Exposed port: 5432

- Redis (Cache):
  - Defined in `docker-compose.yml`
  - Container name: `nest-clean-cache`
  - Exposed port: 6379

- NestJS Application:
  - Main module: `AppModule`
  - HTTP module: `HttpModule`
  - Database module: `DatabaseModule`
  - Authentication: JWT-based (`JwtAuthGuard`)

The application uses Prisma as an ORM for database interactions and implements a caching layer with Redis for improved performance.