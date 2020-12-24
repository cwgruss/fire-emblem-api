interface UpdateHouseProps {
  name: string;
  home: string;
  description: string;
}

/**
 *
 */
export class UpdateHouseDTO {
  readonly name: string;
  readonly home: string;
  readonly description: string;

  constructor(house: UpdateHouseProps) {
    this.name = house.name;
    this.home = house.home;
    this.description = house.description;
    return new Proxy(this, {});
  }
}
