import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataNotFoundException} from '../common/exceptions/data-not-found.exception';
import {CreateHouseDTO} from './dto/create-house.dto';
import {ReadHouseDto} from './dto/read-house.dto';
import {UpdateHouseDTO} from './dto/update-house.dto';
import {HouseEntity} from './repository/house.entity';
import {HousesRepository} from './repository/houses.repository';

interface Houses {
  /**
   * Return all houses.
   */
  getAllHouses(): Promise<ReadHouseDto[]>;

  /**
   * Return a house, found by its id.
   */
  getHouseById(houseID: number): Promise<ReadHouseDto>;

  /**
   * Create a new house and save it.
   */
  createNewHouse(house: CreateHouseDTO): Promise<ReadHouseDto>;

  /**
   * Update a house by its id. If not house is found, create a new house
   */
  updateHouse(houseID: number, house: UpdateHouseDTO): Promise<ReadHouseDto>;
}

@Injectable()
export class HousesService implements Houses {
  constructor(private _houses: HousesRepository<HouseEntity>) {}

  getAllHouses(): Promise<ReadHouseDto[]> {
    return this._houses.listAllHouses();
  }

  async getHouseById(houseId: number): Promise<ReadHouseDto> {
    try {
      const house = await this._houses.findHouseByOrFail('id', houseId);
      console.log(house);

      return house;
    } catch (error) {
      if (error instanceof DataNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  createNewHouse(house: CreateHouseDTO): Promise<ReadHouseDto> {
    // return this._houses.addHouse(house);
    throw new Error('');
  }

  updateHouse(houseID: number, house: UpdateHouseDTO): Promise<ReadHouseDto> {
    // return this._houses.updateHouse(houseID, house);
    throw new Error('');
  }
}
