import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
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
        this.authService.setProfileID(response.profile.id);
        this.authService.setProfileToLocalStorage(response.profile);
        const role = this.authService.getRoleFromToken();
        this.authService.setIsAuthenticatedUser(true);
        console.log(role);
        
        if (role) {
          switch (role) {
            case 'ROLE_MEDIC': 
             this.router.navigate(['/dashboard/doctor/home']);
             break;
            case 'ROLE_PATIENT': 
               this.router.navigate(['/dashboard/patient']);
               break;
            case 'ROLE_ADMIN': 
               this.router.navigate(['/dashboard/doctor/home']);
              break;
            case 'ROLE_SECRETARY':
              // De exemplu, poți avea o pagină dedicată pentru secretare
               this.router.navigate(['/dashboard/secretary']);
               break;
            default:
               this.router.navigate(['/login']);
              break;
          }
          debugger;
        } else {
           this.router.navigate(['/login']);
        }
        
      },
      (error) => {
        this.errorMessage = error || "Login failed verifica datele";
        console.error(error);
      }
    )
  }

}
