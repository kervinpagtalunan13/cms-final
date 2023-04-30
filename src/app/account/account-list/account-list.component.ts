import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EMPTY, catchError, combineLatest, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

export interface userList{
  id: number
  email: string,
  password?: string,
  role:string,
  department_id:string | null,
  created_at: string;
  updated_at: string;
  status: string,
  email_verified_at: string,
  profile?: profileDetails | null,
  department?: departmentDetails | null
}

export interface profileDetails{
  id: number
  name: string,
  profile_pic: string | null,
  user_id: number,
  birth_date: string,
  address: string,
  phone_no: string,
  created_at:string,
  updated_at: string,
}

export interface departmentDetails{
  id: number;
  department_code: string;
  description: string;
  chairs: string;
  members: string;
  created_at: string
  updated_at: string;
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {

  constructor(private userService: UserService,
              private authService: AuthService
    ){}
  
  isLoading:boolean = true
  error: boolean = false
  neededData$ = combineLatest([
    this.userService.users$,
    this.authService.getCurrentUser(),
    this.authService.currentUser$
  ]).pipe(
    tap(),
    catchError(err => {
      this.isLoading = false
      this.error = true
      return EMPTY
    })
  )

  private _listFilter: string = '';
    get listFilter(): string{ 
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter=value;
        this.filteredList = this.performFilter(value);
    }

    filteredList: userList[]=[];

   users: userList[] = [
    {
        "id": 1,
        "email": "esteban18@example.net",
        "role": "admin",
        "department_id": null,
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-03T02:10:17.000000Z",
        "profile": {
            "id": 1,
            "user_id": 1,
            "name": "Tamia Jacobs",
            "address": "6853 Crist Locks\nPort Elinorebury, RI 84932",
            "birth_date": "2008-11-07",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/008811?text=avatar+omnis",
            "phone_no": "662-551-0691",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": null
    },
    {
        "id": 2,
        "email": "wblick@example.com",
        "role": "faculty",
        "department_id": "1",
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": {
            "id": 2,
            "user_id": 2,
            "name": "Prof. Claudine Jast V",
            "address": "234 Corwin Cliff\nNew Mayraburgh, NY 56170-9052",
            "birth_date": "2018-02-03",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/00dd11?text=avatar+illum",
            "phone_no": "682.910.3052",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": {
            "id": 1,
            "department_code": "bsit",
            "description": "Bachelor of Science in Information and Technology",
            "chairs": "[]",
            "members": "[]",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        }
    },
    {
        "id": 3,
        "email": "camille27@example.org",
        "role": "faculty",
        "department_id": "1",
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": {
            "id": 3,
            "user_id": 3,
            "name": "Dr. Dayton Schowalter Sr.",
            "address": "72606 Jacobson Mount Suite 599\nEast Mayeside, AK 49562-9182",
            "birth_date": "2015-03-06",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/003399?text=avatar+quia",
            "phone_no": "1-740-797-2813",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": {
            "id": 1,
            "department_code": "bsit",
            "description": "Bachelor of Science in Information and Technology",
            "chairs": "[]",
            "members": "[]",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        }
    },
    {
        "id": 4,
        "email": "howe.kayley@example.net",
        "role": "faculty",
        "department_id": "1",
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": {
            "id": 4,
            "user_id": 4,
            "name": "Ms. Ardith Fadel",
            "address": "44548 Lavern Walks\nKunzeland, AL 66631-9047",
            "birth_date": "1986-11-25",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/00bb33?text=avatar+et",
            "phone_no": "+1 (551) 613-5831",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": {
            "id": 1,
            "department_code": "bsit",
            "description": "Bachelor of Science in Information and Technology",
            "chairs": "[]",
            "members": "[]",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        }
    },
    {
        "id": 5,
        "email": "rudolph01@example.com",
        "role": "reviewer",
        "department_id": null,
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": {
            "id": 5,
            "user_id": 5,
            "name": "Nelda Johnson",
            "address": "138 Langosh Cliff\nJastmouth, DE 71760-2112",
            "birth_date": "2006-02-10",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/008899?text=avatar+maiores",
            "phone_no": "+1 (629) 531-6919",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": null
    },
    {
        "id": 6,
        "email": "vpurdy@example.net",
        "role": "faculty",
        "department_id": "2",
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": {
            "id": 6,
            "user_id": 6,
            "name": "Prof. Parker Rippin Sr.",
            "address": "62121 Schuster Village Suite 120\nSouth Raegan, AK 03767-9366",
            "birth_date": "2005-09-01",
            "profile_pic": "https:\/\/via.placeholder.com\/640x480.png\/007700?text=avatar+enim",
            "phone_no": "386.562.7341",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        },
        "department": {
            "id": 2,
            "department_code": "blis",
            "description": "Bachelor in Libray in Information System",
            "chairs": "[]",
            "members": "[]",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        }
    },
    {
        "id": 7,
        "email": "jaclyn.christiansen@example.org",
        "role": "reviewer",
        "department_id": null,
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": null,
        "department": null
    },
    {
        "id": 8,
        "email": "eharvey@example.com",
        "role": "chair",
        "department_id": "2",
        "status": "a",
        "email_verified_at": "2023-04-02T14:42:04.000000Z",
        "created_at": "2023-04-02T14:42:04.000000Z",
        "updated_at": "2023-04-02T14:42:04.000000Z",
        "profile": null,
        "department": {
            "id": 2,
            "department_code": "blis",
            "description": "Bachelor in Libray in Information System",
            "chairs": "[]",
            "members": "[]",
            "created_at": "2023-04-02T14:42:04.000000Z",
            "updated_at": "2023-04-02T14:42:04.000000Z"
        }
    }
]


//pangfilter 
performFilter(filterBy: string): userList[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.users.filter((titles: userList)=>
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
pageSize = 3; // Number of items to display per page
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

//pang check kung may laman yung search input (para di mawalan ng laman yung table)


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
