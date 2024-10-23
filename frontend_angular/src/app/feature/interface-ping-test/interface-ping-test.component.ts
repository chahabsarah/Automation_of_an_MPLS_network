import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interface-ping-test',
  templateUrl: './interface-ping-test.component.html',
  styleUrl: './interface-ping-test.component.css'
})
export class InterfacePingTestComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/router', route]);
  }
}
