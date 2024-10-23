import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],

})


export class SideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');

    this.router.navigate(['/login']);
  }
  // Sidebar toggle function in Angular component (e.g., app.component.ts)
toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

}
