import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the token exists and is valid
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Optionally, you can add further checks to validate the token (e.g., decoding the token and checking expiration)
      return true; // Allow access if token is available
    } else {
      // Redirect to home page (login page) if token is not found
      this.router.navigate(['/']);
      return false; // Prevent access to the route
    }
  }
}
