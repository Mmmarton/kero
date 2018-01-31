export class Event {

  location: string;
  date: Date;
  description: string;

  constructor(location: string, date: Date, description: string) {
    this.location = location;
    this.date = date;
    this.description = description;
  }
}
