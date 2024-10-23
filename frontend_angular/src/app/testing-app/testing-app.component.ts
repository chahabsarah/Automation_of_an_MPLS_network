import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-testing-app',
  templateUrl: './testing-app.component.html',
  styleUrl: './testing-app.component.css'
})
export class TestingAppComponent {
constructor( private router : Router, private logService : RouterService){}
  interface(){
    this.router.navigate(['/interfacePingTest'])
  }
  vrf(){
    this.router.navigate(['/vrfToTest'])
  }
  ospf(){
    this.router.navigate(['/ospfToTest'])
  }
  bgp(){
    this.router.navigate(['/bgpToTest'])
  }
  ressources(){
    this.router.navigate(['/ressources'])
  }
  mpls(){
    this.router.navigate(['/mplsToTest'])
  }
  logs() {
    this.logService.getLogs().subscribe(
      response => {
        console.log('Logs récupérés:', response);
        this.router.navigate(['/logs'])
      },
      error => {
        console.error('Erreur lors de la récupération des logs:', error);
      }
    );
  }
}
