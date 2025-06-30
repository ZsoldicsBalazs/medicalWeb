import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorRegistrationRequest } from '../../../domain/doctor-registration.model';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css',
})
export class AddDoctorComponent {
  @Output() doctorCreated = new EventEmitter<DoctorRegistrationRequest>();
  @Output() closeDialog = new EventEmitter<void>();
  @Input() errorMsg: string[] = [];
  doctorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  submit() {
    if (this.doctorForm.valid) {
      const doctorData: DoctorRegistrationRequest = this.doctorForm.value;
      this.doctorCreated.emit(doctorData);
      // this.doctorForm.reset();
    }
  }

  cancel() {
    this.closeDialog.emit();
    this.doctorForm.reset();
  }
}
