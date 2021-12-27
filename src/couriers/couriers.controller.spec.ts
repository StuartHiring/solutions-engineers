import { Test, TestingModule } from '@nestjs/testing';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './couriers.service';


describe('CouriersController', () => {
  let controller: CouriersController;
  let spy_service: CouriersService;

  const CourierServiceSpy = {
    provide: CouriersService,
    useFactory: () => ({
      findCouriers: jest.fn(() => { }),
      createCourier: jest.fn(() => { }),
      updateCourier: jest.fn(() => { }),
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

  it('should call createCourier', async () => {
    controller.createCourier({ id: 1, max_capacity: 45 });
    expect(spy_service.createCourier).toHaveBeenCalled();
  });

  it('should call createCourier with correct parameters', async () => {
    const courier = { id: 1, max_capacity: 45 }

    controller.createCourier(courier);
    expect(spy_service.createCourier).toHaveBeenCalledWith(courier);
  });
  it('should call updateCourier', async () => {
    controller.updateCourier({ id: 1, add_item: { volume: 45 } });
    expect(spy_service.updateCourier).toHaveBeenCalled();
  });

  it('should call updateCourier with correct parameters', async () => {
    const update_courier_data = { id: 1, add_item: { volume: 45 } }
    controller.updateCourier(update_courier_data);

    expect(spy_service.updateCourier).toHaveBeenCalledWith(update_courier_data);
  });


});
