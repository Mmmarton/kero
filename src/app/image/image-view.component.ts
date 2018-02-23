import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from './image.service';
import { Image } from './image.model';
import { ImageDeleteComponent } from './image-delete.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "ArrowRight") {
      this.right();
    } else if (event.key == "ArrowLeft") {
      this.left();
    } else if (event.key == "Escape") {
      this.close();
    }
  }

  constructor(public dialog: MatDialog, private imageService: ImageService, private auth: AuthService) { }

  ngOnInit() {
  }

  close() {
    this.imageService.closeCurrentImage();
  }

  isImageShown() {
    return this.imageService.getCurrentImage() != null;
  }

  getImage() {
    return this.imageService.getCurrentImage().src;
  }

  right() {
    this.imageService.advanceCurrentImage();
  }

  left() {
    this.imageService.previousCurrentImage();
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(ImageDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.close();
      }
      console.log('The dialog was closed');
    });
  }

  isMember() {
    return this.auth.isMember();
  }
}
