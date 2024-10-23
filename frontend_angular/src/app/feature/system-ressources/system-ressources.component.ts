import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-ressources',
  templateUrl: './system-ressources.component.html',
  styleUrl: './system-ressources.component.css'
})
export class SystemRessourcesComponent {
  constructor(private router: Router) {}

  getHardDisk() {
    this.router.navigate(['/hardDisk']);
  }
  getMemory() {
    this.router.navigate(['/memory']);
  }
  getCpu() {
    this.router.navigate(['/cpu']);
  }

}



