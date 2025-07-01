import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isStaffMember: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getRoleFromToken();
    this.isStaffMember = userRole === 'MEDIC' || userRole === 'ADMIN' || userRole === 'SECRETARY';
  }
}
