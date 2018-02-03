export class Event {

  id: string;
  title: string;
  date: Date;
  description: string;
  previews: string[];

  constructor(title: string, date: Date, description?: string, previews?: string[]) {
    this.id = Math.random().toString(36).substring(7);
    this.title = title;
    this.date = date;
    this.description = description;
    this.previews = previews;
  }
}
