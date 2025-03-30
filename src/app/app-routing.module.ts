import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { PatientDashboardComponent } from './dashboard/patient-dashboard/patient-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { roleGuard } from './auth-guard/role.guard';
import { HomeComponent } from './home/home.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // {path: 'rezervation', component: rezervationComponent} TODO:
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
      children: [
          { path: 'doctor', 
            component: DoctorDashboardComponent,  
            canActivate: [roleGuard],
            children:[
                {path: 'home', component: HomeComponent},
                {path:'patients', component: PatientListComponent},
                {path: 'patients/:id', component: PatientDetailsComponent},
                {path: 'appointments', component: DoctorAppointmentsComponent},
                {path: '', redirectTo: 'home', pathMatch: 'full'}
              ]
          },
          { path: 'patient', 
            component: PatientDashboardComponent, 
            canActivate: [roleGuard],
            children: 
            [{path: 'home', component: HomeComponent},
              {path:'aboutMe/:id', component: PatientDetailsComponent},
              {path: 'myAppointments', component: MyAppointmentsComponent} ]
          },
        
      ] },
    
  { path: '**', component:NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
