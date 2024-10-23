import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  showTopNav: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showTopNav = !this.router.url.includes('/login');
      }
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');

    this.router.navigate(['/login']);
  }
}
