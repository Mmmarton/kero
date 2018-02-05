import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from './event.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  event: Event;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EventEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.event = this.data.event.getCopy();
  }

  save() {
    this.data.event.update(this.event);
    this.dialogRef.close();
  }

}
