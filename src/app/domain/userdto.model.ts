export interface UserDTO {
  user_id: number;
  username: string;
  email: string;
  role: Role;
}

export enum Role {
  MEDIC = 'MEDIC',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY'
}