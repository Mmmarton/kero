export class Event {

  title: string;
  date: Date;
  description: string;
  previews: string[];

  constructor(title: string, date: Date, description?: string, previews?: string[]) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.previews = previews;
  }
}
