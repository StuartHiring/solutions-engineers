
## Description


To do this project I have decided to use NestJS (I had never used it professionally, just tried it a year ago), which is a framework I believe is really cool since it provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications, since it is built around the strong design pattern commonly known as Dependency injection and enables the possibility to design and organize dependencies in a more OO-way, which makes it easier to follow the SOLID principles.

For the database I have used TypeORM with postgresQL https://typeorm.io/#/


If I were to have more time I would probably have created my own express typescript architecture, maybe something similar to this  https://github.com/santiq/bulletproof-nodejs. 

I would also have created a better a better environment configuration.


## Naming convention

Although the node js naming convention is using camelCase, since the specification was using snake-case on the requests, and I assumed the responses of the API would need to return snake-case, to avoid having to transform snake-case to camel case, and avoid mixing snake and camelCase, I decided to use snake-case for variables and class-properties. 

## Installation

```bash
$ npm install
```

## Running the app
Rename `test.env` to `.env`

Since the project needs a postgres database to facilitate things I have created a docker-compose file to allow for easy running of a postgres server, you can either use this or use your own local one. To use the docker one just run :

```bash
$  docker compose up -d
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

### Create Courier:

```bash
$ curl --request POST 'http://localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1,"max_capacity":123}'
```
### Find Couriers:

#### Find all couriers:
```bash
curl --request GET 'http://localhost:3000/couriers/lookup'
```
#### Find couriers with capacity greater or equal to {capacity}:

```bash
curl --request GET 'http://localhost:3000/couriers/lookup?available_capacity={capacity}'
```

### Update Courier

#### Add item with specified volume:
```bash
curl --location --request PUT 'http://localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1,"add_item":{ "volume":4}}'
```

#### Remove item with specified volume:
```bash
curl --location --request PUT 'http://localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1,"remove_item":{ "volume":4}}'
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
# create test db with docker if running for the first time.
$ docker compose -f docker-compose.test.yml up -d
$ npm run test:e2e



