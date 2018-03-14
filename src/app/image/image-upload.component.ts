import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
export class ImageUploadComponent implements OnInit {

  eventId: string;
  files: ImageFile[] = [];
  failures: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.id;
    this.failures = false;
  }

  getFiles(event) {
    if (event.target.files && event.target.files[0]) {
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
    let image = new Image();
    let canvas = document.createElement("canvas");
    image.onload = () => {
      let scale = 150 / Math.max(image.width, image.height);
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      if (!file) {
        return;
      }
      file.preview = canvas.toDataURL('image/jpeg', 1);
      this.loadPreview(index + 1);
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
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.resizeImage(event.target.result, 150, 150, index);
    }
    reader.readAsDataURL(file.data);
    reader = null;
  }

  clearFiles() {
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].data = null;
      this.files[i].preview = null;
      this.files[i] = null;
    }
    this.files = [];
  }

  uploadFiles() {
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].failed = false;
    }
    this.failures = false;
    this.uploadFile(0);
  }

  private uploadFile(index: number) {
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

  isFileListEmpty() {
    return this.files.length == 0;
  }

  isFileUploaded(index: number) {
    return this.files[index].uploaded;
  }

  isFileFailed(index: number) {
    return this.files[index].failed;
  }

  removeFile(index: number) {
    this.files[index].data = null;
    this.files[index].preview = null;
    this.files[index] = null;
    this.files.splice(index, 1);
  }

  back() {
    this.router.navigate(['event/' + this.eventId]);
  }
}
