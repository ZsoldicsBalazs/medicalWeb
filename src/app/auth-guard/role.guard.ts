import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Observable } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  
  
    const role = authService.getRoleFromToken();
    console.log(role);
    if (role && (role === 'ROLE_MEDIC' || role === 'ROLE_PACIENT' || role === 'ROLE_ADMIN')) {
      return true;
    } else {
     
      router.navigate(['/login']);
      debugger;
      return false;
    }
  
  

};
