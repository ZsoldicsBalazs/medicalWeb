import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserDTO } from '../../domain/userdto.model';
import { NotificationService } from '../../services/notification.service';
import { DoctorRegistrationRequest } from '../../domain/doctor-registration.model';
import { SecretaryRegistrationRequest } from '../../domain/secretary-registration-request.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent implements OnInit {
  users: UserDTO[] = [];
  displayDialog = false;
  secretaryDialogVisible = false;
  errorMsg: string[] = [];

  constructor(
    private userService: UsersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error(err),
    });
  }

  public updateUserRole(user: UserDTO) {
    this.userService.updateUserRole(user).subscribe({
      next: () =>
        this.notificationService.success(
          'Role update succes',
          `Rolul pentru ${user.username} a fost actualizat.`
        ),
      error: (err) =>
        this.notificationService.warning(
          'Eroare la actualizarea rolului:',
          err
        ),
    });
  }

  showDrDialog() {
    this.displayDialog = true;
  }

  registerDoctor(doctor: DoctorRegistrationRequest) {
    this.userService.registerDoctor(doctor).subscribe({
      next: (data) => {
        this.displayDialog = false;
        this.errorMsg = [];
        this.notificationService.success(
          'Registration',
          `Succesfully registred Dr. ${data.firstName} + ${data.lastName} `
        );
      },
      error: (err) => {
        this.errorMsg = err.error.message;

        this.notificationService.warning(
          'Error',
          err.error.message || 'Error on doctor registration, please try again'
        );
      },
    });
  }

  registerSecretary(secretary: SecretaryRegistrationRequest) {
    this.userService.registerSecretary(secretary).subscribe({
      next: () => {
        this.secretaryDialogVisible = false;
        this.notificationService.success(
          'Employee added',
          'Succesfully registered secretary'
        );
        this.loadUsers();
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        this.notificationService.warning(
          'Error on registration',
          err.error.message ||
            'Error on secretary registration, please try again'
        );
      },
    });
  }
  showSecretaryDialog() {
    this.secretaryDialogVisible = true;
  }
}
