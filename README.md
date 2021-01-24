# Nest Backend Template

A universal backend template that solves most of the problems of the initial stage of the project

## Running

```bash
some bash magic
```

## Npm scripts

Runs the ts files compilation of the project and nodemon
```bash
npm run start:dev
```
Makes your code a little better (Launches prettier)
```bash
npm run format
```
Starts the database server using docker
```bash
npm run db:init
```
Generates and initializes database migrations (Use when changing the database structure or you might lose existing data)
```bash
npm run db:migration:generate

npm run db:migration:run
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Useful links
[The guide from where I got almost everything](https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f)