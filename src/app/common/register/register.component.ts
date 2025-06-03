import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from '../../domain/user-registration.model';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage: string = "";

  @Output() 
  myEvent = new EventEmitter<'login'>();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      CNP: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
      this.authService.registerUser(this.registerForm.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error.error.message);
          this.errorMessage=error.error.message;
        }
      )
    } else {
      console.warn('Invalid form');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  emitEvent() {
    this.myEvent.emit("login");
  }
}
