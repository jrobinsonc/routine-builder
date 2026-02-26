# Routine Builder

## Project setup

1. Set the environment variables. If you are working locally, use the `.env.local`.

   |                          |                          |
   | ------------------------ | ------------------------ |
   | POSTGRES_PRISMA_URL      | Uses connection pooling  |
   | POSTGRES_URL_NON_POOLING | Uses a direct connection |

## Development

1. Run the database migrations: `yarn prisma migrate deploy`.
2. Run the development server: `yarn dev`

And then, you can open [http://localhost:3000](http://localhost:3000) to view the main page.
