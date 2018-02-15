export class ImagePreview {
  id: string;
  src: string;
  loaded: boolean;

  constructor(id: string, src: string) {
    this.id = id;
    this.src = src;
    this.loaded = false;
  }
}
