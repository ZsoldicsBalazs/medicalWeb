import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth-service.service';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { HomeComponent } from './common/home/home.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MyAppointmentsComponent } from './patient/my-appointments/my-appointments.component';
import { DocumentListComponent } from './patient/document-list/document-list.component';
import { DoctorAppointmentsComponent } from './doctor/doctor-appointments/doctor-appointments.component';
import { MatButton } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { DoctorPersonalInfoComponent } from './doctor/doctor-personal-info/doctor-personal-info.component';
import { DoctorStatisticsComponent } from './doctor/doctor-statistics/doctor-statistics.component';
import { DoctorProcedureComponent } from './doctor/doctor-procedure/doctor-procedure.component';
import { DoctorConsultationComponent } from './doctor/doctor-consultation/doctor-consultation.component';
import { PatientConsultationListComponent } from './patient/patient-consultation-list/patient-consultation-list.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './common/register/register.component';
import { AuthComponent } from './common/auth/auth.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { BookAppointmentComponent } from './common/book-appointment/book-appointment.component';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    DashboardComponent,
    SidenavComponent,
    HomeComponent,
    PatientListComponent,
    PatientDetailsComponent,
    MyAppointmentsComponent,
    DocumentListComponent,
    DoctorAppointmentsComponent,
    NotFoundComponent,
    DoctorProfileComponent,
    DoctorPersonalInfoComponent,
    DoctorStatisticsComponent,
    DoctorProcedureComponent,
    DoctorConsultationComponent,
    PatientConsultationListComponent,
    RegisterComponent,
    AuthComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
    DialogModule, 
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    CalendarModule,
    StepsModule,
    DropdownModule,
    TimelineModule

    
  ],
  providers: [
    AuthService, 
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
