import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { roleGuard } from './guards/role.guard';
import { HomeComponent } from './common/home/home.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { MyAppointmentsComponent } from './patient/my-appointments/my-appointments.component';
import { DoctorAppointmentsComponent } from './doctor/doctor-appointments/doctor-appointments.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { patientProfileGuard } from './guards/patient-profile.guard';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { DoctorStatisticsComponent } from './doctor/doctor-statistics/doctor-statistics.component';
import { DoctorConsultationComponent } from './doctor/doctor-consultation/doctor-consultation.component';
import { RegisterComponent } from './common/register/register.component';
import { AuthComponent } from './common/auth/auth.component';
import { BookAppointmentComponent } from './common/book-appointment/book-appointment.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { OauthSuccesComponent } from './common/auth/oauth-succes/oauth-succes/oauth-succes.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // {path: 'rezervation', component: rezervationComponent} TODO:
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'oauth-succes', component: OauthSuccesComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'doctor',
        component: DoctorDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['MEDIC', 'ADMIN'] },
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'patients', component: PatientListComponent },
          { path: 'patients/:id', component: PatientDetailsComponent },
          { path: 'appointments', component: DoctorAppointmentsComponent },
          { path: 'profile', component: DoctorProfileComponent },
          { path: 'statistics', component: DoctorStatisticsComponent },
          { path: 'consultation/:id', component: DoctorConsultationComponent },
          {
            path: 'patients/book-appointment/:id',
            component: BookAppointmentComponent,
            data: { roles: ['MEDIC'] },
          },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
      {
        path: 'patient',
        component: PatientDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['PATIENT'] },
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'aboutMe', component: PatientDetailsComponent },
          { path: 'myAppointments', component: MyAppointmentsComponent },
          { path: 'book-appointment', component: BookAppointmentComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'patients', component: PatientListComponent },
          { path: 'patients/:id', component: PatientDetailsComponent },
          { path: 'appointments', component: DoctorAppointmentsComponent },
          { path: 'profile', component: DoctorProfileComponent },
          { path: 'statistics', component: DoctorStatisticsComponent },
          { path: 'consultation/:id', component: DoctorConsultationComponent },
          {
            path: 'patients/book-appointment/:id',
            component: BookAppointmentComponent,
            data: { roles: ['ADMIN', 'MEDIC'] },
          },
          { path: 'users', component: ManageUserComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
