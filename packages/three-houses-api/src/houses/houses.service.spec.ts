import {Test, TestingModule} from '@nestjs/testing';
import {HousesService} from './houses.service';
import {HouseEntity} from './repository/house.entity';
import {
  HousesInMemoryRepository,
  HousesRepository,
} from './repository/houses.repository';

describe('HousesService', () => {
  let repository: HousesRepository<HouseEntity>;
  let service: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HousesRepository,
          useClass: HousesInMemoryRepository,
        },
        HousesService,
      ],
    }).compile();

    service = module.get<HousesService>(HousesService);
    repository = module.get<HousesRepository<HouseEntity>>(HousesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllHouses', () => {
    it('should call listAllHouses', async () => {
      const result: HouseEntity[] = [];
      jest.spyOn(repository, 'listAllHouses').mockResolvedValue(result);

      expect(await service.getAllHouses()).toBe(result);
    });

    it('should return an array when one house is available', async () => {
      const result: HouseEntity[] = [
        {
          id: 2,
          name: 'Test House',
          leader: {},
          members: [],
          home: 'HOME',
          description: 'This is a test description',
        },
      ];
      jest.spyOn(repository, 'listAllHouses').mockResolvedValue(result);

      const houses = await service.getAllHouses();
      expect(houses).toBeInstanceOf(Array);
      expect(houses).toBe(result);
    });
  });
});
