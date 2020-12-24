import {DataNotFoundException} from '../../common/exceptions';
import {DeleteDataResult} from '../../common/providers';
import {ObjectKeyOf, ValuedOf} from '../../common/util';
import {HOUSES} from '../../mocks/houses.mock';
import {HouseEntity} from './house.entity';

// ================================================================================
// = Houses Repository                                                            =
// ================================================================================

/**
 * Houses Data Access Object
 * Abstracts access to the underlying data implementation
 * for Houses.
 */
interface HousesDAO<T> {
  /**
   * Returns an array of all house entities in the system
   */
  listAllHouses(): Promise<T[]>;

  /**
   * Find a single house by a property
   */
  findHouseBy<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T | null>;

  /**
   * Find a single house by a property.
   * If no house is found, an exception is thrown
   */
  findHouseByOrFail<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T>;

  /**
   * Find all houses matching a property
   */
  findHousesBy<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T[]>;

  /**
   * Inserts a new house into the system
   */
  addHouse(house: T): Promise<T | null>;

  /**
   * Updates a house in the system; if no
   * existing house is found, a new one is created
   */
  updateHouse(houseID: number, house: T): Promise<T | null>;

  /**
   * Removes a house from the system
   */
  deleteHouse(id: number): Promise<DeleteDataResult>;

  /**
   * Drops all houses from the system
   */
  dropAllHouses(): Promise<DeleteDataResult>;
}

/**
 * Abstract House Repository
 * An abstract class implementing HouseDAO, making metadata class avaialble for DI.
 */
export abstract class HousesRepository<House extends HouseEntity>
  implements HousesDAO<House> {
  abstract listAllHouses(): Promise<House[]>;

  abstract findHouseBy<Prop extends keyof House>(
    property: Prop,
    value: House[Prop]
  ): Promise<House | null>;

  abstract findHouseByOrFail<Prop extends keyof House>(
    property: Prop,
    value: House[Prop]
  ): Promise<House>;

  abstract findHousesBy<Prop extends keyof House>(
    property: Prop,
    value: House[Prop]
  ): Promise<House[]>;

  abstract addHouse(house: House): Promise<House | null>;

  abstract updateHouse(houseID: number, house: House): Promise<House | null>;

  abstract deleteHouse(id: number): Promise<DeleteDataResult>;

  abstract dropAllHouses(): Promise<DeleteDataResult>;
}

/**
 *
 */
export class HousesInMemoryRepository<
  House extends HouseEntity
> extends HousesRepository<House> {
  private _inMemoryRepository: House[] = [];

  constructor(houses: House[]) {
    super();
    this._inMemoryRepository = houses || HOUSES;
  }

  listAllHouses(): Promise<House[]> {
    return new Promise(resolve => {
      resolve(this._inMemoryRepository);
    });
  }

  findHouseBy(
    property: ObjectKeyOf<House>,
    value: ValuedOf<House>
  ): Promise<House | null> {
    return new Promise(resolve => {
      const house =
        this._inMemoryRepository.find(house => {
          const houseValue = house[property];
          return houseValue === value;
        }) || null;

      resolve(house);
    });
  }

  findHouseByOrFail(
    property: ObjectKeyOf<House>,
    value: ValuedOf<House>
  ): Promise<House> {
    return new Promise(resolve => {
      const house = this._inMemoryRepository.find(house => {
        const houseValue = house[property];
        return houseValue === value;
      });

      if (!house) {
        throw new DataNotFoundException(
          `House with a property of ${property} matching ${value} does not exist.`
        );
      }

      resolve(house);
    });
  }

  async findHousesBy(
    property: ObjectKeyOf<House>,
    value: ValuedOf<House>
  ): Promise<House[]> {
    return new Promise(resolve => {
      const houses = this._inMemoryRepository.filter(house => {
        const houseValue = house[property];
        return houseValue === value;
      });

      resolve(houses);
    });
  }

  async addHouse(house: House): Promise<House> {
    return new Promise(resolve => {
      this._inMemoryRepository.push(house);
      resolve(house);
    });
  }

  async updateHouse(houseID: number, house: House): Promise<House> {
    const id = Number(houseID);
    const index = await this._findIndexBy('id', id);
    this._inMemoryRepository[index] = house;
    return house;
  }

  deleteHouse(houseID: number): Promise<DeleteDataResult> {
    const id = Number(houseID);
    return new Promise(resolve => {
      const indexToDelete = this._inMemoryRepository.findIndex(
        book => book.id === id
      );

      if (indexToDelete === -1) {
        throw new DataNotFoundException(
          `House with an matching ${id} does not exist.`
        );
      }

      this._inMemoryRepository.splice(1, indexToDelete);

      resolve({
        affected: 1,
        status: 'success',
      });
    });
  }

  dropAllHouses(): Promise<DeleteDataResult> {
    return new Promise(resolve => {
      const count = this._inMemoryRepository.length;
      this._inMemoryRepository = [];
      resolve({
        affected: count,
        status: 'success',
      });
    });
  }

  private _findBy<Prop extends ObjectKeyOf<House>>(
    property: Prop,
    value: House[Prop]
  ): Promise<House | null> {
    return new Promise(resolve => {
      const house =
        this._inMemoryRepository.find(house => {
          const houseValue = house[property];
          return houseValue === value;
        }) || null;
      resolve(house);
    });
  }

  private _findIndexBy<Prop extends ObjectKeyOf<House>>(
    property: Prop,
    value: House[Prop]
  ): Promise<number> {
    return new Promise(resolve => {
      const idx = this._inMemoryRepository.findIndex(house => {
        const houseValue = house[property];
        return houseValue === value;
      });
      resolve(idx);
    });
  }
}
