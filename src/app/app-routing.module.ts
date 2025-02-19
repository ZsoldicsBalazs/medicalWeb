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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    component: DashboardComponent,
  
      children: [
        
        { path: 'doctor', component: DoctorDashboardComponent,  canActivate: [AuthGuard,roleGuard], children:[

            {path: 'home', component: HomeComponent},
            {path:'patients', component: PatientListComponent}
        ]},
        { path: 'patient', component: PatientDashboardComponent, canActivate: [AuthGuard, roleGuard] },
      
      ] },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
