import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  // Create a signal to store user state (e.g., logged in status)
  loggedIn = signal<boolean>(true); // True indicates the user is logged in

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('accessToken'); // Remove the access token
    this.loggedIn.set(false); // Update the logged-in state with signal
    this.router.navigate(['/']); // Redirect to the login page
  }
}
