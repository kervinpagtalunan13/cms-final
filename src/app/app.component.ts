import { Component, DoCheck, OnInit } from '@angular/core';
import { ContentService } from './core/services/content.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  constructor(private contentService: ContentService){
this.contentService.contentAction$.subscribe(
    content => {
      if(content){
        this.isDarkMode = !!Number(content.is_dark_mode_active)
      }
    }
  )
  }
  isDarkMode: any;
  
  
  
  // ngOnInit(): void {
    
  // }

  ngDoCheck(): void {
    
    if(!this.isDarkMode){
      if (this.body) {
             this.body.classList.add('theme-light');
             this.body.classList.remove('theme-dark');
            // console.log('putaninang yan'+this.madilimBa);
         }
       }
       else if(this.isDarkMode){
         if (this.body) {
           this.body.classList.add('theme-dark');
           this.body.classList.remove('theme-light');
          // console.log('putaninang mo');
       }
       }
  }
  ngOnInit(): void {

    if(!this.isDarkMode){
     if (this.body) {
            this.body.classList.add('theme-light');
            this.body.classList.remove('theme-dark');
            //console.log('set as light');
        }
      }
      else if(this.isDarkMode){
        if (this.body) {
          this.body.classList.add('theme-dark');
          this.body.classList.remove('theme-light');
          //console.log('set as dark');
      }
      }
  }
  title = 'cict-curriculum-system';
   body = document.querySelector('body');
  }
  

