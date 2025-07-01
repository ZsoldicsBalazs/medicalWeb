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
import { DoctorPersonalInfoComponent } from './doctor/doctor-profile/doctor-personal-info/doctor-personal-info.component';
import { DoctorStatisticsComponent } from './doctor/doctor-statistics/doctor-statistics.component';
import { DoctorProcedureComponent } from './doctor/doctor-profile/doctor-procedure/doctor-procedure.component';
import { DoctorConsultationComponent } from './doctor/doctor-consultation/doctor-consultation.component';
import { PatientConsultationListComponent } from './patient/patient-consultation-list/patient-consultation-list.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './common/register/register.component';
import { AuthComponent } from './common/auth/auth.component';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { BookAppointmentComponent } from './common/book-appointment/book-appointment.component';
import { TimelineModule } from 'primeng/timeline';
import { DoctorFreeDaySchedulerComponent } from './doctor/doctor-profile/doctor-free-day-scheduler/doctor-free-day-scheduler.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { OauthSuccesComponent } from './common/auth/oauth-succes/oauth-succes/oauth-succes.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from 'primeng/editor';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { UserListComponent } from './admin/manage-user/user-list/user-list.component';
import { AddDoctorComponent } from './admin/manage-user/add-doctor/add-doctor.component';
import { AddSecretaryComponent } from './admin/manage-user/add-secretary/add-secretary.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NewsboardComponent } from './common/newsboard/newsboard.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SecretaryDashboardComponent } from './secretary/secretary-dashboard/secretary-dashboard.component';
import { SecretaryProfileComponent } from './secretary/secretary-profile/secretary-profile.component';
import { TagModule } from 'primeng/tag';

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
    BookAppointmentComponent,
    DoctorFreeDaySchedulerComponent,
    AdminDashboardComponent,
    OauthSuccesComponent,
    ManageUserComponent,
    UserListComponent,
    AddDoctorComponent,
    AddSecretaryComponent,
    NewsboardComponent,
    ManageNewsComponent,
    SecretaryDashboardComponent,
    SecretaryProfileComponent,
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
    TimelineModule,
    SelectButtonModule,
    ConfirmPopupModule,
    TableModule,
    CommonModule,
    BrowserAnimationsModule,
    EditorModule,
    PanelModule,
    FieldsetModule,
    MessageModule,
    BadgeModule,
    CardModule,
    ConfirmDialogModule,
    FileUploadModule,
    AccordionModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    TagModule,
  ],
  providers: [
    AuthService,
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
