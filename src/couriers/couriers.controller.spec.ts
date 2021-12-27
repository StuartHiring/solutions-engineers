import { Test, TestingModule } from '@nestjs/testing';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './couriers.service';


describe('CouriersController', () => {
  let controller: CouriersController;
  let spy_service: CouriersService;

  const CourierServiceSpy = {
    provide: CouriersService,
    useFactory: () => ({
      findCouriers: jest.fn(() => {}),
    }),
  }
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouriersController],
      providers: [CourierServiceSpy],

    }).compile();

    controller = module.get<CouriersController>(CouriersController);
    spy_service = module.get<CouriersService>(CouriersService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findCouriers', async () => {
    controller.findCouriers();
    expect(spy_service.findCouriers).toHaveBeenCalled();
  });

  it('should call findCouriers with correct parameters', async () => {
    const capacity_required = 45

    controller.findCouriers({ capacity_required });
    expect(spy_service.findCouriers).toHaveBeenCalledWith({ capacity_required });
  });


});
