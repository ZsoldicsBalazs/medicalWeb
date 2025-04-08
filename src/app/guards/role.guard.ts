import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const role = authService.getRoleFromToken();
  console.log(role);
  
  if (!role) {
    // Dacă nu este autentificat, redirecționează la login
    console.log("nueste autentificat")
    return router.createUrlTree(['/login']);
  }

  // Dacă ruta începe cu '/doctor' și utilizatorul este pacient, nu permite accesul
  if (state.url.startsWith('/dashboard/doctor') && role === 'ROLE_PATIENT') {
    // Redirecționează spre dashboard-ul pacientului
    console.log("nu ai voie sa intri la doctor")
    return router.createUrlTree(['dashboard/patient']);
  }

  // Dacă ruta începe cu '/patient' și utilizatorul este doctor, nu permite accesul
  if (state.url.startsWith('/dashboard/patient') && role === 'ROLE_ADMIN') {
    // Redirecționează spre dashboard-ul doctorului
    console.log("nu ai voie sa intri la pacient")
    return router.createUrlTree(['dashboard/doctor/home']);
  }

  return true;
};
