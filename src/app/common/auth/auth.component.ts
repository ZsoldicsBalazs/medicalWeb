import { Component } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  activeForm: 'login' | 'register' = 'login';


handleEvent(formType: 'login' | 'register') {
    
    this.activeForm=formType;
  }
  
}
