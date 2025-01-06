import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees'; // Backend API URL
  private loginUrl = 'http://localhost:3000/login'; // URL for login endpoint

  constructor(private http: HttpClient) {}

  // Login method to authenticate user and get token
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token); // Save token to localStorage
          console.log('Login successful, token saved');
        } else {
          console.error('Login failed: No token received');
        }
      }),
      catchError(this.handleError) // Handle login errors
    );
  }

  // Method to generate Authorization headers for API requests
  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (!token) {
      console.error('No auth token found. User might not be logged in.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add Bearer token
      'Content-Type': 'application/json'
    });
  }

  // Get all employees with Bearer token
  getEmployees(): Observable<Employee[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Employee[]>(this.apiUrl, { headers }).pipe(
      tap(employees => console.log('Fetched employees:', employees)),
      catchError(this.handleError) // Handle errors
    );
  }

  // Get a single employee by ID with Bearer token
  getEmployee(id: number): Observable<Employee> {
    const headers = this.createAuthHeaders();
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(employee => console.log('Fetched employee:', employee)),
      catchError(this.handleError) // Handle errors
    );
  }

  // Logout method to clear auth token
  logout(): void {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    console.log('Logged out and cleared auth token');
  }

  // Error handling helper
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
