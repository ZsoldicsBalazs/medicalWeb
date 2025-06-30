import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecretaryRegistrationRequest } from '../../../domain/secretary-registration-request.model';

@Component({
  selector: 'app-add-secretary',
  templateUrl: './add-secretary.component.html',
  styleUrl: './add-secretary.component.css',
})
export class AddSecretaryComponent {
  @Output() secretaryCreated = new EventEmitter<SecretaryRegistrationRequest>();
  @Output() closeDialog = new EventEmitter<void>();
   @Input() errorMsg: string[] = [];

  secretaryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.secretaryForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [null, [Validators.required, Validators.min(0)]],
    });
  }

  submit() {
    if (this.secretaryForm.valid) {
      const secretaryData: SecretaryRegistrationRequest =
        this.secretaryForm.value;
      this.secretaryCreated.emit(secretaryData);
    }
  }

  cancel() {
    this.closeDialog.emit();
    this.secretaryForm.reset();
  }
}
