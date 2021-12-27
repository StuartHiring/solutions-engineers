import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from './couriers.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Courier } from '../db/entities/courier.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

export const repositoryMockFactory = jest.fn(() => ({
  find: jest.fn(entity => entity),
}));
describe('CouriersService', () => {
  let service: CouriersService;
  let repositoryMock: Repository<Courier>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouriersService,
        { provide: getRepositoryToken(Courier), useFactory: repositoryMockFactory },


      ],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
    repositoryMock = module.get(getRepositoryToken(Courier));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();

repositoryMock.find()
  }); it('should be defined', () => {

    service.findCouriers({})
    expect(repositoryMock.find).toHaveBeenCalled();

  });
  it('should be defined', () => {
    const capacity_required = 45
    expect(service).toBeDefined();
    service.findCouriers({ capacity_required })
    expect(repositoryMock.find).toHaveBeenLastCalledWith({ where: { available_capacity: MoreThanOrEqual(capacity_required) } });

  });
});
