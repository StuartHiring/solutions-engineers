import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from './couriers.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Courier } from '../db/entities/courier.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

export const repository_mock_factory = jest.fn(() => ({
  find: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  findOne: jest.fn(_ => null),

}));
describe('CouriersService', () => {
  let service: CouriersService;
  let repository_mock: Repository<Courier>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouriersService,
        { provide: getRepositoryToken(Courier), useFactory: repository_mock_factory },


      ],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
    repository_mock = module.get(getRepositoryToken(Courier));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    repository_mock.find()
  });


  it('should call find method', async() => {
    await service.findCouriers({})
    expect(repository_mock.find).toHaveBeenCalled();

  });
  it('should call find method with correct parameters',async () => {
    const capacity_required = 45
    await service.findCouriers({ capacity_required })
    expect(repository_mock.find).toHaveBeenCalledWith({ where: { available_capacity: MoreThanOrEqual(capacity_required) } });
  });

  it('should call createCourier method', async () => {
    const courier = { id: 1, max_capacity: 45 }
    await service.createCourier(courier)
    expect(repository_mock.save).toHaveBeenCalled();

  });
  it('should  call createCourier method with correct parameters', async () => {
    const courier = { id: 1, max_capacity: 45 }
    await service.createCourier(courier)
    expect(repository_mock.save).toHaveBeenCalledWith({ id: 1, max_capacity: 45, available_capacity: 45 });
  });
});
