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

  dispose() {
    this.data = null;
    this.uploaded = null;
    this.failed = null;
    this.name = null;
    this.preview = null;
    this.loaded = null;
    this.deleted = null;
  }
}