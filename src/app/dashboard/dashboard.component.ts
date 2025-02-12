import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute){}

ngOnInit(): void {
  const role = this.authService.getRoleFromToken();
  debugger;
  if (role === 'ROLE_MEDIC' || role === 'ROLE_ADMIN') {
    this.router.navigate(['doctor'], { relativeTo: this.activatedRoute });
  } else if (role === 'ROLE_PACIENT') {
    this.router.navigate(['patient'], { relativeTo: this.activatedRoute });
  } else {
    this.router.navigate(['/login']);
  }
}
}
