import { Component, OnInit, HostListener } from '@angular/core';
import { ImageDeleteComponent } from './image-delete.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';
import { ImagePreviewService } from './image-preview.service';

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

  constructor(public dialog: MatDialog, private imageService: ImagePreviewService, private auth: AuthService) { }

  ngOnInit() {
  }

  close() {
    this.imageService.closeCurrentImage();
  }

  isImageShown() {
    return this.imageService.getCurrentImage() != null;
  }

  getImage() {
    return this.imageService.getCurrentImage().image;
  }

  right() {
    this.imageService.advanceCurrentImage();
  }

  left() {
    this.imageService.previousCurrentImage();
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(ImageDeleteComponent);

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        this.close();
      }
      console.log('The dialog was closed');
    });
  }

  isMember() {
    return this.auth.isMember();
  }
}
