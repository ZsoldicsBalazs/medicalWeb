import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        console.log('the token is exxx');
        // Store the token and fetch user profile
        this.authService.setToken(token);
        this.authService.setIsAuthenticatedUser(true);

        // Fetch user profile to get role and profile ID
        // this.authService.getUserProfile().subscribe(
        //   (profile: any) => {
        //     this.authService.setProfileID(profile.id);
        //     this.authService.setProfileToLocalStorage(profile);
        //     const role = this.authService.getRoleFromToken();
        //     this.redirectBasedOnRole(role);
        //   },
        //   (error) => {
        //     console.error('Error fetching profile:', error);
        //     this.router.navigate(['/login'], { queryParams: { error: 'true' } });
        //   }
        // );

        // Clear query parameters from URL
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else if (!this.authService.isAuthenticated()) {
        console.log('authservice. isauthenticated = false ! or true');
        this.router.navigate(['/auth']);
      }
    });
  }

  private redirectBasedOnRole(role: string | null): void {
    if (role) {
      switch (role) {
        case 'ROLE_MEDIC':
          this.router.navigate(['/dashboard/doctor/home']);
          break;
        case 'ROLE_PATIENT':
          this.router.navigate(['/dashboard/patient/home']);
          break;
        case 'ROLE_ADMIN':
          this.router.navigate(['/dashboard/doctor/home']);
          break;
        case 'ROLE_SECRETARY':
          this.router.navigate(['/dashboard/secretary/home']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
