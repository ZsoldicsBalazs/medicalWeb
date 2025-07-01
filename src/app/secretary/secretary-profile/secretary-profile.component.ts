import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';
import { UserDTO } from '../../domain/userdto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Secretary } from '../../domain/secretary.model';

@Component({
  selector: 'app-secretary-profile',
  templateUrl: './secretary-profile.component.html',
  styleUrls: ['./secretary-profile.component.css'],
})
export class SecretaryProfileComponent implements OnInit {
  secretaryProfile!: Secretary;
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
    let secretary = this.authService.getProfileDetails();
    let obj = JSON.parse(secretary ?? '{}');
    this.secretaryProfile = obj as Secretary;
    this.loading = false;
  }
}
