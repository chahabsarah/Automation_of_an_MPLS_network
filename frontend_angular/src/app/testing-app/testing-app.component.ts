import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing-app',
  templateUrl: './testing-app.component.html',
  styleUrl: './testing-app.component.css'
})
export class TestingAppComponent {
constructor( private router : Router){}
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
}
