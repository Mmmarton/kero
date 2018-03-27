import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { AuthService } from '../services/auth.service';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../user/user.model';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit, OnDestroy {

  imagePreviews: ImagePreview[] = [];
  event: Event;
  user: User;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private eventService: EventService,
    private router: Router,
    private imageService: ImagePreviewService,
    private auth: AuthService) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(this.route.snapshot.params.id);
    if (this.event) {
      this.eventService.setCurrentEvent(this.event);
      this.loadAuthor();
      this.getImages();
    }
    else {
      this.auth.get("event/" + this.route.snapshot.params.id).subscribe(
        response => {
          this.event = new Event().loadFrom(response);
          this.eventService.setCurrentEvent(this.event);
          this.loadAuthor();
          this.getImages();
        },
        error => {
          this.auth.logoutIfNeeded(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.event.dispose();
    this.user.dispose();
  }

  private loadAuthor() {
    this.auth.get("user/" + this.event.authorId).subscribe(
      response => {
        this.user = new User().update(response);
      },
      error => {
        this.auth.logoutIfNeeded(error);
        if (error.status == 400) {
          if (error.error.message == "INVALID_USER") {
            this.user = new User();
          }
        }
      }
    );
  }

  private getImages() {
    this.auth.get("image/" + this.event.id).subscribe(
      response => {
        this.imageService.imagePreviews = this.imagePreviews;
        for (let i = 0; i < response.length; i++) {
          let imagePreview = new ImagePreview();
          imagePreview.id = response[i].id;
          imagePreview.authorId = response[i].authorId;
          imagePreview.image = "image/preview/" + response[i].imagePath;
          this.imagePreviews.push(imagePreview);
        }
      },
      error => {
        this.auth.logoutIfNeeded(error);
      }
    );
  }

  count(size: number) {
    return new Array(size);
  }

  openEdit(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(response => {
    });
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(EventDeleteComponent, {
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(response => {
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

  canDelete() {
    return this.auth.isMember() && (this.auth.getUser().id == this.event.authorId || this.auth.isAdmin());
  }

  isLoaded(imageId: number) {
    return this.imagePreviews[imageId].loaded;
  }

  enableImage(event, preview: ImagePreview) {
    if (event.value && !preview.enabled) {
      preview.enabled = true;
    }
  }
}
