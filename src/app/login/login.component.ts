import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router){}

  onLogin(): void {
    this.authService.login(this.email,this.password).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        console.log("before navigation")
        this.router.navigate(['/dashboard']);
        console.log("after navigation");
        debugger;
      },
      (error) => {
        this.errorMessage = error || "Login failed verifica datele";
        console.error(error);
      }
    )
  }

}
