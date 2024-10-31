import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DjangoFront';
  constructor(private router: Router) {}
  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }
  isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('access_token');

  this.router.navigate(['/login']);
}
isAdmin(): boolean {
  return localStorage.getItem('is_admin') === 'true';
}

// Method to check if the user is a technician
isTechnician(): boolean {
  return localStorage.getItem('is_technician') === 'true';
}
}
