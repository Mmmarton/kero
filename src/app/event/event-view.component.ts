import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from './event.model';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { EventEditComponent } from './event-edit.component';
import { MatDialog } from '@angular/material';
import { EventDeleteComponent } from './event-delete.component';
import { ImagePreviewService } from '../image/image-preview.service';
import { ImagePreview } from '../image/image-preview.model';
import { ImageUploadComponent } from '../image/image-upload.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  imagePreviews: ImagePreview[] = [];
  event: Event;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private eventService: EventService,
    private router: Router,
    private imageService: ImagePreviewService,
    private auth: AuthService) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(this.route.snapshot.params.id);
    if (this.event) {
      this.getImages();
    }
    else {
      this.auth.get("event/" + this.route.snapshot.params.id).subscribe(
        response => {
          this.event = response;
          this.getImages();
        },
        error => {
          this.router.navigate(['/galery']);
        }
      );
    }
  }

  private getImages() {
    this.auth.get("image/" + this.event.id).subscribe(
      response => {
        this.imageService.imagePreviews = this.imagePreviews;
        for (let i = 0; i < response.length; i++) {
          let imagePreview = new ImagePreview();
          imagePreview.id = response[i].id;
          imagePreview.image = response[i].imagePath;
          this.imagePreviews.push(imagePreview);
          this.loadImage(imagePreview);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  private loadImage(imagePreview: ImagePreview) {
    this.auth.get("image/" + imagePreview.image, 'text').subscribe(
      response => {
        imagePreview.setImage(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getPreview(imageId: number) {
    return this.imagePreviews[imageId].image;
  }

  count(size: number) {
    return new Array(size);
  }

  openEdit(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(response => {
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(EventDeleteComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(response => {
      console.log('The dialog was closed');
    });
  }

  viewImage(index: number) {
    this.imageService.setCurrentImage(index);
  }

  loaded(imageId: number) {
    this.imagePreviews[imageId].loaded = true;
  }

  isMember() {
    return this.auth.isMember();
  }

  isLoaded(imageId: number) {
    return this.imagePreviews[imageId].loaded;
  }
}
