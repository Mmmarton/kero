export class ImageFile {
  data: any;
  uploaded: boolean;
  failed: boolean;
  name: string;
  preview: any;
  loaded: boolean;
  deleted: boolean;

  constructor() {
    this.uploaded = false;
    this.loaded = false;
  }
}