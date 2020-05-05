import faker from 'faker';
import { Mappable } from './CustomMap';

export class User implements Mappable {
  private name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'red';

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
  markerContent(): string {
    return `User Name is: ${this.name}`;
  }
}
