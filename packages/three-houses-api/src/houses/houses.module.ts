import {Module} from '@nestjs/common';
import {HousesController} from './houses.controller';
import {HousesService} from './houses.service';
import {
  HousesInMemoryRepository,
  HousesRepository,
} from './repository/houses.repository';

@Module({
  controllers: [HousesController],
  providers: [
    HousesService,
    {
      provide: HousesRepository,
      useClass: HousesInMemoryRepository,
    },
  ],
})
export class HousesModule {}
