import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role, UserDTO } from '../../../domain/userdto.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() users: UserDTO[] = [];
  @Output() roleUpdated = new EventEmitter<UserDTO>();
  roles = [
    { label: 'Admin', value: Role.ADMIN },
    { label: 'Medic', value: Role.MEDIC },
    { label: 'Pacient', value: Role.PATIENT },
    { label: 'Secretar', value: Role.SECRETARY },
  ];

  searchEmail: string = '';

  get filteredUsers(): UserDTO[] {
    if (!this.searchEmail) {
      return this.users;
    }

    return this.users.filter((user) =>
      user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }

  onRoleChange(user: UserDTO, newRole: Role) {
    this.confirmationService.confirm({
      message: `Ești sigur că vrei să schimbi rolul utilizatorului ${user.username} de la  ${user.role} la =>   ${newRole}?`,
      header: 'Confirmare schimbare rol',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Da',
      rejectLabel: 'Nu',
      accept: () => {
        const updatedUser: UserDTO = { ...user, role: newRole };
        this.roleUpdated.emit(updatedUser);
      },
    });
  }
}
