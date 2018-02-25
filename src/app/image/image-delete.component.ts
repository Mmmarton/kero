import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ImagePreviewService } from './image-preview.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.scss']
})
export class ImageDeleteComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ImageDeleteComponent>,
    private router: Router,
    private imageService: ImagePreviewService,
    private auth: AuthService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  delete() {
    this.auth.delete("image/" + this.imageService.getCurrentImage().id, 'text').subscribe(
      response => {
        this.dialogRef.close(this.imageService.deleteCurrentImage());
      },
      error => {

      }
    );
  }

}
