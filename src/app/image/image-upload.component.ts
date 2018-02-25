import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageFile } from './file.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  eventId: string;
  files: ImageFile[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.id;

    //this.router.navigate(['/event', this.eventId]);
  }

  getFiles(event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        let file = new ImageFile();
        file.data = event.target.files[i];
        file.name = event.target.files[i].name;
        this.files.push(file);
      }
    }
  }

  clearFiles() {
    this.files = [];
  }

  uploadFiles() {
    for (let i = 0; i < this.files.length; i++) {
      if (!this.files[i].uploaded) {
        this.uploadFile(this.files[i]);
      }
    }
  }

  private uploadFile(file: ImageFile) {
    let body = new FormData();
    body.append("image", file.data);
    this.auth.post("image/" + this.eventId, body, 'text').subscribe(
      response => {
        console.log(response);
        file.uploaded = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  isFileListEmpty() {
    return this.files.length == 0;
  }

  isFileUploaded(index: number) {
    return this.files[index].uploaded;
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
