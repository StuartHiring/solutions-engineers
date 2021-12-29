import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CouriersModule } from './../src/couriers/couriers.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courier } from './../src/db/entities/courier.entity';

let app: INestApplication;
let repository: Repository<Courier>;

beforeAll(async () => {
    const module = await Test.createTestingModule({
        imports: [
            CouriersModule,
            // Use the e2e_test database to run the tests
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5434,
                username: 'stuart',
                password: 'password',
                database: 'stuartTest',
                entities: ['./**/*.entity.ts'],
                synchronize: true,
            }),
        ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get(getRepositoryToken(Courier));

});


afterAll(async () => {
    await app.close();
});


describe('GET /courier/lookup', () => {
    beforeEach(async () => {
        await repository.save([
            { id: 1, max_capacity: 45, available_capacity: 45 },
            { id: 2, max_capacity: 50, available_capacity: 50 },
            { id: 3, max_capacity: 55, available_capacity: 55 },

        ]);
    })

    afterEach(async () => {
        await repository.query(`DELETE FROM couriers;`);
    });

    it('should return all couriers when no query param sent', async () => {

        const { body } = await request(app.getHttpServer())
            .get('/couriers/lookup')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toEqual([
            { id: 1, max_capacity: 45, available_capacity: 45 },
            { id: 2, max_capacity: 50, available_capacity: 50 },
            { id: 3, max_capacity: 55, available_capacity: 55 },
        ]);
    });

    it('should return couriers according to query param restrictions', async () => {
        const { body } = await request(app.getHttpServer())
            .get('/couriers/lookup?capacity_required=48')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toEqual([
            { id: 2, max_capacity: 50, available_capacity: 50 },
            { id: 3, max_capacity: 55, available_capacity: 55 },
        ]);
    });
});
describe('POST /courier', () => {
    afterEach(async () => {
        await repository.query(`DELETE FROM couriers;`);
    });

    it('should be able to create a new courier', async () => {
        await request(app.getHttpServer())
            .post('/couriers')
            .send({ id: 1, max_capacity: 50, available_capacity: 50 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
        const courier = await repository.find({})
        expect(courier).toEqual([
            { id: 1, max_capacity: 50, available_capacity: 50 },
        ]);
    });

    it('should return 409 error when trying to create 2 couriers with same id', async () => {
        await repository.save({ id: 1, max_capacity: 45, available_capacity: 45 })
        await request(app.getHttpServer())
            .post('/couriers')
            .send({ id: 1, max_capacity: 50, available_capacity: 50 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409);
    });

});

describe('PUT /courier', () => {
    const max_capacity = 50
    const available_capacity = 30
    const item_volume = 10
    beforeEach(async () => {
        await repository.save([
            { id: 1, max_capacity, available_capacity: available_capacity }

        ]);
    })
    afterEach(async () => {
        await repository.query(`DELETE FROM couriers;`);
    });

    it('should be able to remove item from courier', async () => {
        await request(app.getHttpServer())
            .put('/couriers')
            .send({ id: 1, remove_item: { volume: item_volume } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const courier = await repository.find({})
        expect(courier).toEqual([
            { id: 1, max_capacity: 50, available_capacity: available_capacity + item_volume },
        ]);
    });

    it('should be able to add item to courier', async () => {
        await request(app.getHttpServer())
            .put('/couriers')
            .send({ id: 1, add_item: { volume: item_volume } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const courier = await repository.find({})
        expect(courier).toEqual([
            { id: 1, max_capacity: 50, available_capacity: available_capacity - item_volume },
        ]);
    });
});