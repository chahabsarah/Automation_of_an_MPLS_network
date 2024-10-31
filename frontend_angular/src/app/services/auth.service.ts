import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8000/myapp';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ access: string; is_admin: boolean;is_technician: boolean; }>(`${this.API_URL}/login/`, credentials)
      .toPromise()
      .then(response => {
        // Store the access token and user role in localStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('is_admin', String(response.is_admin));
        localStorage.setItem('is_technician', String(response.is_technician));
        return response;
      })
      .catch(error => {
        console.error('Erreur de connexion:', error);
        throw error.error ? error.error : 'Une erreur inconnue s\'est produite.';
      });
  }

  register(userData: { username: string; email: string; password1: string; password2: string }) {
    return this.http.post(`${this.API_URL}/signup/`, userData).toPromise()
      .catch(error => {
        console.error('Registration error:', error);  // Log the error response
        throw error.error ? error.error : 'Une erreur inconnue s\'est produite.';
      });
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_admin'); // Optional: Clear the user role on logout
    localStorage.removeItem('is_technician'); // Optional: Clear the user role on logout

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Helper methods to check user roles
  isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }

  isTechnician(): boolean {
    return localStorage.getItem('is_technician') === 'true';
  }
}
