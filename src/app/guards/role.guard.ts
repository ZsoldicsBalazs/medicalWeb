import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];
  console.log(expectedRoles + ' <-- this is expected roles');
  const userRole = authService.getRoleFromToken();

  if (userRole && userRole.includes(expectedRoles[0])) {
    console.log('user role . incudes expectedrole[0]');
    return true;
  }
  console.log('navigation to auth');
  router.navigate(['/auth']);
  return false;
};
