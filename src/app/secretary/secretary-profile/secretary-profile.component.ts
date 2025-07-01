import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-secretary-profile',
  templateUrl: './secretary-profile.component.html',
  styleUrls: ['./secretary-profile.component.css']
})
export class SecretaryProfileComponent implements OnInit {
  secretaryProfile: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadSecretaryProfile();
  }

  private loadSecretaryProfile(): void {
    const profileId = this.authService.getProfileId();
    if (!profileId) {
      this.error = 'Profile ID not found';
      this.loading = false;
      return;
    }

    this.usersService.getUserById(profileId).subscribe({
      next: (profile) => {
        this.secretaryProfile = profile;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading secretary profile:', error);
        this.error = 'Failed to load profile information';
        this.loading = false;
      }
    });
  }
} 