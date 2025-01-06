import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employees/services/employee.service';
import { signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: WritableSignal<string | null>; // Declare signal
  isSubmitting: WritableSignal<boolean>; // Declare signal

  private router: Router;
  private employeeService: EmployeeService;
  private fb: FormBuilder;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _employeeService: EmployeeService
  ) {
    // Use constructor to inject dependencies only
    this.fb = _fb;
    this.router = _router;
    this.employeeService = _employeeService;
    
    // Initialize signals here,
    this.errorMessage = signal(null);
    this.isSubmitting = signal(false);
  }

  ngOnInit(): void {
    // Initialize the form on ngOnInit
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // email field with validation
      password: ['', Validators.required] // password field with required validation
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Please fill in the required fields correctly.');
      return;
    }

    this.isSubmitting.set(true); // Set submitting state to true
    this.errorMessage.set(null); // Clear previous errors

    const { email, password } = this.loginForm.value;

    this.employeeService.login(email, password).subscribe(
      (response) => {
        this.isSubmitting.set(false); // Reset submitting state
        if (response && response.token) {
          localStorage.setItem('authToken', response.token); // Save token in localStorage
          this.router.navigate(['/employees']); // Navigate to employees page
        } else {
          this.errorMessage.set('Login failed: No token received');
        }
      },
      (error) => {
        this.isSubmitting.set(false); // Reset submitting state
        this.errorMessage.set('Login failed: ' + (error.error?.message || 'Invalid email or password'));
      }
    );
  }
}
