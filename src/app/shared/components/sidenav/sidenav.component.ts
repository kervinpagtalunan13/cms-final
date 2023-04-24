import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(private route: ActivatedRoute, 
              private authService: AuthService,
              private router: Router,
              private contentService: ContentService
    ){}
    
  showSideNav = false
  // currentUser = this.authService.currentUser$
  // currentUser$ = this.authService.getCurrentUser().pipe(
  //   tap(user => console.log(user)
  //   )
  // )

  neededData$ = combineLatest([
    this.authService.getCurrentUser(),
    this.authService.currentUser$,
    
  ]).pipe(
    map(([x, user]) => {
      return user
    })
  )
  
  logo: string = ''
  title:string = ''
  isDarkMode: boolean = false
  contentData$ = combineLatest([
    this.contentService.content$,
    this.contentService.contentAction$
  ]).pipe(
      tap(([x, content]) => {
        this.title = content.title_text
        this.logo = content.logo_path
        this.isDarkMode = !!content.is_dark_mode_active
      })
    ).subscribe()
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['showSidenav'];
      this.showSideNav = query
    });
  }

  logout(){
    this.authService.logout().subscribe(
      data => this.router.navigate(['/login'])
    )
  }
}
