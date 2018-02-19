import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  uploader: FileUploader;
  eventId: number;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.id;

    this.uploader = new FileUploader({ url: "https://evening-anchorage-3159.herokuapp.com/api/" });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (this.uploader.getNotUploadedItems().length == 0) {
        this.router.navigate(['/event', this.eventId]);
      }
    };
  }
}
