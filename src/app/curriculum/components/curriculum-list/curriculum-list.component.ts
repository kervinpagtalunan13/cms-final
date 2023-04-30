import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Curriculum, Curriculum2 } from 'src/app/core/models/curriculum';
import {MatDialog} from '@angular/material/dialog';


import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { EMPTY, catchError, combineLatest, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.css']
})




export class CurriculumListComponent {
  items = [
    { id: 1, name: 'Red', color: 'red', theme: 'cict-curriculum-system-dark-theme' },
    { id: 2, name: 'Blue', color: 'blue', theme: 'cict-curriculum-system-dark-theme' },
    { id: 3, name: 'Green', color: 'green', theme: 'cict-curriculum-system-dark-theme' },
    { id: 4, name: 'Yellow', color: 'yellow', theme: 'cict-curriculum-system-dark-theme' },
  ];

  constructor(private dialog: MatDialog,
              private curriculumService: CurriculumService,
              private authService: AuthService
              ) {}
  
  role:any = ''  
  isLoading:boolean = true
  curriculums:Curriculum2[] = []
  revisions:any[] = []
  curriculumPendings:Curriculum2[] = []
  error:boolean = false
  currentUser!: User

  newCurCount:number = 0
  newRevisionsCount:number = 0
  newCurPendingsCount:number = 0

  neededData$ = combineLatest([
    this.authService.getCurrentUser(),
    this.curriculumService.curriculums$,
    this.curriculumService.revisions$
  ]).pipe(
    tap(([user, curriculums, revisions]) => {
      this.currentUser = user
      this.curriculums = curriculums.filter(curr => curr.status != 'p')
      this.curriculumPendings = curriculums.filter(curr => curr.status == 'p')

      this.revisions = revisions
      this.newRevisionsCount = revisions.filter(rev => rev.is_new).length
      this.newCurPendingsCount = this.curriculumPendings.filter(cur => cur.is_new && cur.status == 'p').length
      this.newCurCount = this.curriculums.filter(cur => cur.is_new && cur.status == 'a').length
      this.role = user.role
      this.isLoading = false
    }),
    catchError(err => {
      this.isLoading = false
      this.error = true
      return EMPTY
    })
  )

            
    
  
  openDialog() {
    const dialogRef = this.dialog.open(curriculumDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


    //pang filter
    private _listFilter: string = '';
    get listFilter(): string{ 
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter=value;
        this.filteredList = this.performFilter(value);
    }
    //pang filter
  
    filteredList: Curriculum[]=[]; //array ng filtered list
  
    data: Curriculum[] = [
      {'title':'CICT Curriculum Ver.',
      'version':'3.2.1',
      'date':'04-03-2005',
      'author':'Kyla Delfin',
      'role':'Chair',
      'status':'Proposed',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.2.0',
      'date':'01-12-2004',
      'author':'Mang Ben',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.9',
      'date':'01-12-2004',
      'author':'Kervs',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.8',
      'date':'01-12-2004',
      'author':'Von Plaza',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.7',
      'date':'01-12-2004',
      'author':'Kervin',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.6',
      'date':'01-12-2004',
      'author':'Von Plaza',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.5',
      'date':'01-12-2004',
      'author':'Von Plaza',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
      {'title':'CICT Curriculum Ver.',
      'version':'3.1.4',
      'date':'01-12-2004',
      'author':'Von Plaza',
      'role':'Chair',
      'status':'For revision',
      "isCurrent":"false"},
    ];
  
    //pangfilter 
    performFilter(filterBy: string): Curriculum[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.data.filter((titles: Curriculum)=>
      titles.title.toLowerCase().includes(filterBy)||
      titles.version.toLowerCase().includes(filterBy)||
      titles.date.toLowerCase().includes(filterBy)||
      titles.author.toLowerCase().includes(filterBy)||
      titles.role.toLowerCase().includes(filterBy)||
      titles.status.toLowerCase().includes(filterBy)||
      titles.isCurrent.toLowerCase().includes(filterBy)
      );
  }
  //pangfilter
   
    
  //paginator
    totalItems = this.data.length; // Total number of items in your table
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
        this.totalItems = this.data.length;
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
      this.displayedItems = this.data.slice(startIndex, endIndex);
    }
    loadPageWithFilter(pageIndex: number): void {
      const startIndex = pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedItems = this.filteredList.slice(startIndex, endIndex);
    }
  //paginator
}

@Component({
  selector: 'curriculum-list-modal-dialog',
  templateUrl: './curriculum-list.modal.html',
})
export class curriculumDialog {

}