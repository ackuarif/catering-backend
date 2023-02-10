## Config
- update DATABASE_URL in env file to local database 

## Running steps
- run `yarn` to install dependencies
- run `yarn prisma generate --schema=./src/db/schema.prisma` to generate prisma client
- run `yarn prisma migrate dev --schema=./src/db/schema.prisma --name init` to migrate table

## REST API address