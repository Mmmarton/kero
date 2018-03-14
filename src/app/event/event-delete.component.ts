import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Event } from './event.model';

@Component({
  selector: 'app-event-delete',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.scss']
})
export class EventDeleteComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EventDeleteComponent>,
    private eventService: EventService,
    private router: Router,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  delete() {
    this.auth.delete("event/" + this.data.event.id, 'text').subscribe(
      response => {
        this.router.navigate(['/galery']);
      },
      error => {
        this.auth.logoutIfNeeded(error);
      }
    );
    this.dialogRef.close();
  }

}
