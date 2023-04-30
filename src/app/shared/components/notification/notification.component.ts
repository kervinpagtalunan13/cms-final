import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message:string = 'Input Field Required'
  @Input() type: string = ''

  @Output() close = new EventEmitter()

  logo:any = {
    error: 'error',
    success: 'check'
  }

  getType:any = {
    error: 'danger',
    success: 'success'
  }

  onClose(){
    this.close.emit()
  }
}
