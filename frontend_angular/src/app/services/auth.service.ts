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
    return this.http.post<{ access: string }>(`${this.API_URL}/login/`, credentials)
      .toPromise()
      .then(response => {
        // Stockez le token dans le localStorage
        localStorage.setItem('access_token', response.access);
        return response;
      })
      .catch(error => {
        console.error('Erreur de connexion:', error); // Ajout de log
        throw error.error ? error.error : 'Une erreur inconnue s\'est produite.'; // Modifier ici pour renvoyer le message d'erreur
      });
  }
  register(userData: { username: string; email: string; password1: string; password2: string }) {
    return this.http.post(`${this.API_URL}/signup/`, userData).toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
