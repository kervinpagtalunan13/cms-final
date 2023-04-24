import { Component, OnInit } from '@angular/core';
import { Content } from './core/models/content.model';
import { ContentService } from './core/services/content.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private contentService: ContentService){

  }
  isDarkMode: boolean = false
  ngOnInit(): void {
    this.contentService.contentAction$.subscribe(
      content => {
        if(content){
          this.isDarkMode = !!Number(content.is_dark_mode_active)
        }
      }
    )
  }

  

  title = 'cict-curriculum-system';
   body = document.querySelector('body');
   
  toggleDarkMode(){
    
    if (this.body) {
            this.body.classList.add('theme-dark');
            this.body.classList.remove('theme-light');
            console.log('set as dark');
            
        
    }
  }

  toggleLightMode(){
    
    if (this.body) {
            this.body.classList.add('theme-light');
            this.body.classList.remove('theme-dark');
            console.log('set as light');
        }
    }
  }
  

