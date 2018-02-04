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

  getCopy() {
    return new Event(this.title, this.date, this.description, this.previews);
  }

  update(event: Event) {
    if (!event) {
      return;
    }
    this.title = event.title;
    this.date = event.date;
    if (event.description) {
      this.description = event.description;
    }
    if (event.previews) {
      this.previews = event.previews;
    }
  }
}
