import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError, combineLatest, tap } from 'rxjs';
import { handleError } from 'src/app/core/errorHandling/errorHandler';
import { Department } from 'src/app/core/models/department';
import { User } from 'src/app/core/models/user';
import { DepartmentService } from 'src/app/core/services/department.service';
import { ViewProfileComponent } from 'src/app/shared/components/view-profile/view-profile.component';

@Component({
  selector: 'app-department-container',
  templateUrl: './department-container.component.html',
  styleUrls: ['./department-container.component.css']
})
export class DepartmentContainerComponent {
  constructor(private departmentService: DepartmentService,
              private dialog: MatDialog,
    ){}
  
  departments!: Department[]
  errorInit:boolean = false
  isLoading:boolean = true

  neededData$ = combineLatest([
    this.departmentService.departments$
  ]).pipe(
    tap(([departments]) => {
      this.departments = departments
      this.isLoading = false
    }),
    catchError(err => {
      this.isLoading = false
      this.errorInit = true
      return EMPTY
    })
  )

  viewProfile(user: User){
    const dialogRef = this.dialog.open(ViewProfileComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const status = user.status == 'a' ? 'i' : 'a'
        // const data = {status: status}
        // this.accountService.toggleStatus(user.id, data).subscribe(
        //   data => {
        //     this.users = this.users.map(use => use.id != user.id ? use : data)
        //   }
        // )
      } else {

      }
    });
  }
}
