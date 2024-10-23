import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ospf-interface-to-test',
  templateUrl: './ospf-interface-to-test.component.html',
  styleUrl: './ospf-interface-to-test.component.css'
})
export class OspfInterfaceToTestComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/ospf', route]);
  }
}
