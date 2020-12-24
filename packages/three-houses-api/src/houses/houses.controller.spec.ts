import {Test, TestingModule} from '@nestjs/testing';
import {HousesController} from './houses.controller';
import {HousesService} from './houses.service';
import {
  HousesInMemoryRepository,
  HousesRepository,
} from './repository/houses.repository';

describe('HousesController', () => {
  let service: HousesService;
  let controller: HousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [
        {
          provide: HousesRepository,
          useClass: HousesInMemoryRepository,
        },
        HousesService,
      ],
    }).compile();

    controller = module.get<HousesController>(HousesController);
    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
