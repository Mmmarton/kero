export class ImageFile {
  data: any;
  uploaded: boolean;
  name: string;
  preview: any;
  loaded: boolean;

  constructor() {
    this.uploaded = false;
    this.loaded = false;
  }
}