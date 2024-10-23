import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bgp-interface-to-test',
  templateUrl: './bgp-interface-to-test.component.html',
  styleUrl: './bgp-interface-to-test.component.css'
})
export class BgpInterfaceToTestComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/bgp', route]);
  }
}
