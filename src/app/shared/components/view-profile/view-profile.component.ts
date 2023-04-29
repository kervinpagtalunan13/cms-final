import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get user() {
    return this.data.user;
  }
  get role(){
    return this.data.role
  }
  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
