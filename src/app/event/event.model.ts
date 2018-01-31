export class Event {

  location: string;
  date: Date;
  description: string;
  previews: string[];

  constructor(location: string, date: Date, description?: string, previews?: string[]) {
    this.location = location;
    this.date = date;
    this.description = description;
    this.previews = previews;
  }
}
