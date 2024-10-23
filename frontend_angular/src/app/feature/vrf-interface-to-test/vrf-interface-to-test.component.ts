import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vrf-interface-to-test',
  templateUrl: './vrf-interface-to-test.component.html',
  styleUrl: './vrf-interface-to-test.component.css'
})
export class VrfInterfaceToTestComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/vrf', route]);
  }
}
