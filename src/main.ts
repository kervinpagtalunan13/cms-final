import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
export class Main{
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
