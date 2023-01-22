## Config
- update DATABASE_URL in env file to local database 

## Running steps
- run `yarn` to install dependencies
- run `yarn prisma generate --schema=./src/db/schema.prisma` to generate prisma client
- run `yarn prisma migrate dev --schema=./src/db/schema.prisma --name init` to migrate table

## REST API address
- Tambah Anggota Keluarga
    url : http://localhost:3000/api/v1/anggota/ [POST]
    body : 
        {
            "name":"Arif",
            "parent" : null
        }

- Delete Anggota Keluarga
    url : http://localhost:3000/api/v1/anggota/1 [DELETE]

- Tambah Aset Anggota Keluarga
    url : http://localhost:3000/api/v1/aset/ [POST]
    body : 
        {
            "anggota_id": 1,
            "name" : "infinix",
            "price": 2000
        }

- Delete Aset Anggota Keluarga
    url : http://localhost:3000/api/v1/aset/1 [DELETE]

- Total nilai aset per orang
    url : http://localhost:3000/api/v1/aset/getSummaryByAnggotaId/1 [GET]