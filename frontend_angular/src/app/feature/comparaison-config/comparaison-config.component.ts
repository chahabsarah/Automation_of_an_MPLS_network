import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparaison-config',
  templateUrl: './comparaison-config.component.html',
  styleUrl: './comparaison-config.component.css'
})
export class ComparaisonConfigComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/conf', route]);
  }
}
