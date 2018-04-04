import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageFile } from './file.model';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnDestroy {

  private static reader = new FileReader();
  private static canvas = document.createElement("canvas");
  private static image = new Image();

  eventId: string;
  files: ImageFile[] = [];
  failures: boolean;

  private continueUploads;
  private startedUploads;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.id;
    this.failures = false;
    this.continueUploads = true;
    this.startedUploads = false;
  }

  ngOnDestroy() {
    this.continueUploads = false;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i]) {
        this.files[i].dispose();
      }
    }
    this.files = null;
  }

  getFiles(event) {
    if (event.target.files && event.target.files[0]) {
      this.continueUploads = true;
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i].type.substring(0, 5) == "image") {
          let file = new ImageFile();
          file.data = event.target.files[i];
          file.name = event.target.files[i].name;
          this.files.push(file);
        }
      }
      this.loadPreview(0);
    }
  }

  resizeImage(url, width, height, index) {
    let file = this.files[index];
    let image = ImageUploadComponent.image;
    let canvas = ImageUploadComponent.canvas;
    image.onload = () => {
      let scale = 150 / Math.max(image.width, image.height);
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      if (!file) {
        return;
      }
      file.preview = canvas.toDataURL('image/jpeg', 1);
      if (this.continueUploads) {
        this.loadPreview(index + 1);
      }
      canvas = null;
      image = null;
    }
    image.src = url;
  }

  loadPreview(index: number) {
    if (index == this.files.length) {
      return;
    }
    let file = this.files[index];
    ImageUploadComponent.reader.onload = (event: any) => {
      this.resizeImage(event.target.result, 150, 150, index);
    }
    ImageUploadComponent.reader.readAsDataURL(file.data);
  }

  clearFiles() {
    this.continueUploads = false;
    this.startedUploads = false;
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].deleted = true;
    }
    Observable.timer(200).subscribe(() => {
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].dispose();
        this.files[i] = null;
      }
      this.files = [];
    });
  }

  uploadFiles() {
    this.startedUploads = true;
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].failed = false;
    }
    this.failures = false;
    this.uploadFile(0);
  }

  private uploadFile(index: number) {
    if (!this.continueUploads) {
      return;
    }
    if (index == this.files.length) {
      if (!this.failures) {
        let snackBarRef = this.snackbarService.showMessage("All images uploaded.", "success");
        snackBarRef.afterDismissed().subscribe(
          () => { this.router.navigate(['event/' + this.eventId]); }
        );
      }
      else {
        this.snackbarService.showMessage("Failed to upload some images.", "error");
      }
      return;
    }
    if (this.files[index].uploaded) {
      this.uploadFile(index + 1);
      return;
    }
    let file = this.files[index];
    let body = new FormData();
    body.append("image", file.data);
    this.auth.post("image/" + this.eventId, body, 'text').subscribe(
      response => {
        file.uploaded = true;
        this.uploadFile(index + 1);
      },
      error => {
        this.auth.logoutIfNeeded(error);
        file.failed = true;
        this.failures = true;
        this.uploadFile(index + 1);
      }
    );
  }

  canUpload() {
    return this.isFileListEmpty() && !this.startedUploads;
  }

  isFileListEmpty() {
    return this.files.length == 0;
  }

  isFileUploaded(index: number) {
    return this.files[index].uploaded;
  }

  isFileFailed(index: number) {
    return this.files[index].failed;
  }

  removeFile(file: ImageFile) {
    file.deleted = true;
    Observable.timer(200).subscribe(() => {
      this.files.splice(this.files.findIndex(f => f.data == file.data), 1);
      file.dispose();
      file = null;
    });
  }

  back() {
    this.router.navigate(['event/' + this.eventId]);
  }
}
