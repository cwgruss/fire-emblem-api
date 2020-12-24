interface CreateHouseProps {
  name: string;
  home: string;
  description: string;
}

/**
 *
 */
export class CreateHouseDTO {
  readonly name: string;
  readonly home: string;
  readonly description: string;

  constructor(house: CreateHouseProps) {
    this.name = house.name;
    this.home = house.home;
    this.description = house.description;
    return new Proxy(this, {});
  }
}
