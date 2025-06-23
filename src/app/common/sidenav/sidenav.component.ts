import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import {MenuItem } from '../../domain/menu-item.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class  SidenavComponent {
 
  @Input() menuItems: MenuItem[]=[];

  constructor (private authService: AuthService, private router: Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
