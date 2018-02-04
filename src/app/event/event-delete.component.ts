import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from './event.service';
import { Router } from '@angular/router';

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  delete() {
    this.eventService.deleteEvent(this.data.event);
    this.router.navigate(['/galery']);
    this.dialogRef.close();
  }

}
