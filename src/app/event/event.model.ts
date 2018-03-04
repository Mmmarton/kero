export class Event {
  public static defaultPicture = "/assets/img/preview.jpg";
  id: string;
  authorId: string;
  title: string;
  date: Date;
  description: string;
  previews: string[];

  constructor() { }

  new(id: string, title: string, date: Date) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = "";
    this.previews = [Event.defaultPicture];
    return this;
  }

  load(id: string, authorId: string, title: string, date: Date, description?: string, previews?: string[]) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.date = date;
    this.description = description;
    this.previews = previews;
    return this;
  }

  getCopy() {
    let event: Event = new Event();
    event.id = this.id;
    event.authorId = this.authorId;
    event.description = this.description;
    event.previews = this.previews;
    event.title = this.title;
    event.date = this.date;
    return event;
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
