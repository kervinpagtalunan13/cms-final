import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-elective-subject-dialog',
  templateUrl: './elective-subject-dialog.component.html',
  styleUrls: ['./elective-subject-dialog.component.css']
})
export class ElectiveSubjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ElectiveSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  get title() {
    return this.data.title;
  }

  get message() {
    return this.data.message;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
