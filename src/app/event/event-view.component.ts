import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from './event.model';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { EventEditComponent } from './event-edit.component';
import { MatDialog } from '@angular/material';
import { EventDeleteComponent } from './event-delete.component';
import { ImageService } from '../image/image.service';
import { ImagePreview } from '../image/image-preview.model';
import { ImageUploadComponent } from '../image/image-upload.component';

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
    private imageService: ImageService) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(this.route.snapshot.params.id);
    if (this.event) {
      this.imagePreviews = this.imageService.getImagePreviews(this.event.id);
    }
    else {
      this.router.navigate(['/galery']);
    }
  }

  getPreview(imageId: number) {
    return this.imagePreviews[imageId].src;
  }

  count(size: number) {
    return new Array(size);
  }

  openEdit(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(EventDeleteComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAdd(): void {
    let dialogRef = this.dialog.open(ImageUploadComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  viewImage(preview: ImagePreview) {
    this.imageService.setCurrentImage(preview.id);
  }

  loaded(imageId: number) {
    this.imagePreviews[imageId].loaded = true;
  }

  isLoaded(imageId: number) {
    return this.imagePreviews[imageId].loaded;
  }
}
