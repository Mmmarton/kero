export class Event {

  id: string;
  authorId: string;
  title: string;
  date: Date;
  description: string;
  previews: string[];

  constructor(id: string, authorId: string, title: string, date: Date, description?: string, previews?: string[]) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.date = date;
    this.description = description;
    this.previews = previews;
  }

  getCopy() {
    return new Event(this.id, this.authorId, this.title, this.date, this.description, this.previews);
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
