interface ReadHouseProps {
  name: string;
  home: string;
  description: string;
}

export class ReadHouseDto {
  readonly name: string;
  readonly home: string;
  readonly description: string;

  constructor(house: ReadHouseProps) {
    this.name = house.name;
    this.home = house.home;
    this.description = house.description;
    return new Proxy(this, {});
  }
}
