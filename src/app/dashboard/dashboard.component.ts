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
  
}
}
