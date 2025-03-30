import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const patientProfileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedInPatientId = Number(authService.getProfileId());
  const requestedPatientId = Number(route.paramMap.get('id'));

  if (loggedInPatientId === requestedPatientId) {
    return true; // Permite accesul
  } else {
    router.navigate(['/dashboard/patient/aboutMe', loggedInPatientId]); // Redirecționează către profilul propriu
    return false; // Blochează accesul
  }
};
