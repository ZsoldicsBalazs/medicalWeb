import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
 
  constructor (private authService: AuthService, private router: Router){}

  isSidebarOpen = false;
  isDropdownOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar open:', this.isSidebarOpen);
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
