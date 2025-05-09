// src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public userName: string | null = null;
  private loginStatusSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    // Subscribe to the loggedIn$ observable from the AuthService
    this.loginStatusSubscription = this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        // If logged in, you can also retrieve the user's name or info if needed
        const token = localStorage.getItem('jwt_token');
        if (token) {
          // Decode the JWT token to get the user's name (or other info)
          const decodedToken = this.decodeToken(token);
          this.userName = decodedToken?.sub || 'User'; // Example: Assuming 'sub' holds the username
        }
      } else {
        this.userName = null;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  // Decode JWT token (you can use a JWT library to decode, or do it manually)
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  logout(): void {
    this.authService.logout();         // Clears token + emits false
    this.userName = null;              // Clear user name
    this.isLoggedIn = false;           // Optional: for immediate visual feedback
    this.router.navigate(['/login']);  // Redirect to login page
  }
  
}
