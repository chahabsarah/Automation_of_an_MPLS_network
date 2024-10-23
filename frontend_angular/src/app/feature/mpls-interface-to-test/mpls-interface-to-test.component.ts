import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mpls-interface-to-test',
  templateUrl: './mpls-interface-to-test.component.html',
  styleUrl: './mpls-interface-to-test.component.css'
})
export class MplsInterfaceToTestComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/mpls', route]);
  }
}
