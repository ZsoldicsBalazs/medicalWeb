import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth-service.service';
import { Patient } from '../../../../domain/patient.model';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-oauth-succes',
  templateUrl: './oauth-succes.component.html',
  styleUrl: './oauth-succes.component.css',
})
export class OauthSuccesComponent implements OnInit {
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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
            this.notificationService.success(
              'Welcome' + profile.firstName + ' ' + profile.lastName,
              ''
            );
          },
          (error) => {
            this.errorMessage =
              'Failed to fetch user profile after Google login. Please try again.';
            console.error('Profile fetch error:', error);
            this.notificationService.warning('Login Error', error);
            // this.router.navigate(['/auth'], { replaceUrl: true });
          }
        );
      } else if (params['error']) {
        this.errorMessage = 'Oauth login failed. Please try again.';
        this.notificationService.warning('Login Error', this.errorMessage);

        console.error('OAuth2 error:', params['error']);
      }
    });
  }

  private redirectBasedOnRole(role: string | null): void {
    if (role) {
      console.log('Redirecting to role:', role); // Debug
      switch (role) {
        case 'ROLE_MEDIC':
          this.router.navigate(['/dashboard/doctor/home'], {
            replaceUrl: true,
          });
          break;
        case 'ROLE_PATIENT':
          this.router.navigate(['/dashboard/patient'], { replaceUrl: true });
          break;
        case 'ROLE_ADMIN':
          this.router.navigate(['/dashboard/admin/home'], { replaceUrl: true });
          break;
        case 'ROLE_SECRETARY':
          this.router.navigate(['/dashboard/secretary'], { replaceUrl: true });
          break;
        default:
          console.warn('Unknown role:', role);
          this.router.navigate(['/auth'], { replaceUrl: true });
          break;
      }
    } else {
      console.warn('No role found, redirecting to login');
      this.router.navigate(['/auth'], { replaceUrl: true });
    }
  }
}
