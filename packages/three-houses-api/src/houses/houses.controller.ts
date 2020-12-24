import {Controller, Get, Param} from '@nestjs/common';
import {HousesService} from './houses.service';

@Controller('houses')
export class HousesController {
  constructor(private _houseService: HousesService) {}

  @Get()
  async getHouses() {
    const houses = await this._houseService.getAllHouses();
    return houses;
  }

  @Get(':houseID')
  async getHouse(@Param('houseID') houseID: string) {
    const id = Number(houseID);
    const houses = await this._houseService.getHouseById(id);
    return houses;
  }
}
