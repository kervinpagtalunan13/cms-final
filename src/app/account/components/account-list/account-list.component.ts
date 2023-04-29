import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AccountService } from 'src/app/core/services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountRegistrationComponent} from 'src/app/account/components/account-registration/account-registration.component'
import { AuthService } from 'src/app/core/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewProfileComponent } from 'src/app/shared/components/view-profile/view-profile.component';
export interface UserData {
  age: number;
  name: string;
}
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})


export class AccountListComponent2{
  
  constructor(private accountService: AccountService, 
              private dialog: MatDialog,
              private authService: AuthService,
              ) {}


  user:User | any
  role:any = ''
  isLoading:boolean = true
  error: boolean = false
  neededData$ = combineLatest([
    this.accountService.users$,
    this.authService.getCurrentUser(),
    this.authService.currentUser$
  ]).pipe(
    tap(([users, userObs, user]) => {
      this.users = users
      this.user = user
      this.role = user?.role
      this.isLoading = false
    }),
    catchError(err => {
      this.isLoading = false
      this.error = true
      return EMPTY
    })
  )

  canView(){
    // return this.role === 'admin'
    return true
  }

  viewProfile(user: User){
    const dialogRef = this.dialog.open(ViewProfileComponent, {
      data: {
        user: user,
        role: this.role
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const status = user.status == 'a' ? 'i' : 'a'
        const data = {status: status}
        this.accountService.toggleStatus(user.id, data).subscribe(
          data => {
            this.users = this.users.map(use => use.id != user.id ? use : data)
          }
        )
      } else {

      }
    });
  }

  isLoading$ = new BehaviorSubject<boolean>(true)
  users$ = this.accountService.users$.subscribe(
    users => {
        this.users = users
        this.isLoading$.next(false)
    }
  )

  openDialog() {
    const dialogRef = this.dialog.open(AccountRegistrationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  private _listFilter: string = '';
  get listFilter(): string{ 
    return this._listFilter;
  }
  set listFilter(value: string){
      this._listFilter=value;
      this.filteredList = this.performFilter(value);
  }

  filteredList: User[] = [];
  users: User[] = []
 
//pangfilter 
performFilter(filterBy: string): User[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.users.filter((titles: User)=>
  titles.profile?.name.toLowerCase().includes(filterBy)||
  titles.department?.description.toLowerCase().includes(filterBy)||
  titles.department?.department_code.toLowerCase().includes(filterBy)||
  titles.email.toLowerCase().includes(filterBy)||
  titles.role.toLowerCase().includes(filterBy)
  );
}
//pangfilter

//paginator
totalItems = this.users.length; // Total number of items in your table
pageSize = 10; // Number of items to display per page
pageSizeOptions = [3, 5, 10]; // Options for the number of items per page

currentPageIndex = 0; // Current page index
displayedItems: any[] = []; // The items to display on the current page
//paginator


//pang filter
ngOnInit(): void {
  this.listFilter = '';
}
//pang filter

//pang check kung may laman yung search input (para di mawalan ng laman yung table)
ngDoCheck(): void{
  if(!this.listFilter){
    this.totalItems = this.users.length;
    this.loadPageWithoutFilter(this.currentPageIndex);
  }
  else{
    this.totalItems = this.filteredList.length;
    this.loadPageWithFilter(this.currentPageIndex);
  }
}



//paginator
onPageChange(event: PageEvent): void {
  this.currentPageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadPageWithoutFilter(this.currentPageIndex);
}

loadPageWithoutFilter(pageIndex: number): void {
  const startIndex = pageIndex * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedItems = this.users.slice(startIndex, endIndex);
}

loadPageWithFilter(pageIndex: number): void {
  const startIndex = pageIndex * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedItems = this.filteredList.slice(startIndex, endIndex);
}
//paginator

}

