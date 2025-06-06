import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../domain/patient.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  visible: boolean = false;
  isRegistering: boolean = false;
  registerForm!: FormGroup;
  submitted = false;

  @Output() 
  myEvent = new EventEmitter<'register'>();

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute){
    this.registerForm = this.fb.group({
      cnp: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

    
      if (token) {
        // Store token and set authenticated state
        this.authService.setToken(token);
        this.authService.setIsAuthenticatedUser(true);
       
        this.redirectBasedOnRole(this.authService.getRoleFromToken());

        
        this.authService.getUserProfile().subscribe(
          (profile: Patient) => {
            this.authService.setProfileID(String(profile.id));
            this.authService.setProfileToLocalStorage(profile);
            const role = this.authService.getRoleFromToken();
            console.log('Role from token:', role); // Debug
            this.redirectBasedOnRole(role);
          },
          (error) => {
            this.errorMessage = 'Failed to fetch user profile after Google login. Please try again.';
            console.error('Profile fetch error:', error);
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        );
      } else if (params['error']) {
        this.errorMessage = 'Google login failed. Please try again.';
        console.error('OAuth2 error:', params['error']);
      }
    });
  }

  private redirectBasedOnRole(role: string | null): void {
    if (role) {
      console.log('Redirecting to role:', role); // Debug
      switch (role) {
        case 'ROLE_MEDIC':
          this.router.navigate(['/dashboard/doctor/home'], { replaceUrl: true });
          break;
        case 'ROLE_PATIENT':
          this.router.navigate(['/dashboard/patient'], { replaceUrl: true });
          break;
        case 'ROLE_ADMIN':
          this.router.navigate(['/dashboard/doctor/home'], { replaceUrl: true });
          break;
        case 'ROLE_SECRETARY':
          this.router.navigate(['/dashboard/secretary'], { replaceUrl: true });
          break;
        default:
          console.warn('Unknown role:', role);
          this.router.navigate(['/login'], { replaceUrl: true });
          break;
      }
    } else {
      console.warn('No role found, redirecting to login');
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

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
               this.router.navigate(['/dashboard/secretary']);
               break;
            default:
               this.router.navigate(['/login']);
              break;
          }
          
        } else {
           this.router.navigate(['/login']);
        }
        
      },
      (error) => {
        this.errorMessage = error || "Login failed verifica datele introduse";
        console.error(error);
      }
    )
  }

  showDialog() {
    this.visible = true;
  }

  emitEvent() {
    this.myEvent.emit('register');
  }
  loginWithGoogle() {
    console.log('Initiating Google login');
    window.location.href = "http://localhost:1212/oauth2/authorization/google"
  }

  loginWithFacebook(){
    window.location.href = "http://localhost:1212/oauth2/authorization/facebook";
  }

}
