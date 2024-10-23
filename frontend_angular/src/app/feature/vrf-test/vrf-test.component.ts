import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vrf-test',
  templateUrl: './vrf-test.component.html',
  styleUrls: ['./vrf-test.component.css']
})
export class VrfTestComponent implements OnInit {
  vrfSummaryData: any[] = [];  // To hold VRF summary data
  consoleOutput: string = '';  // To hold the raw command output
  errorMessage: string = '';

  constructor(private routerService: RouterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');
    if (routerId) {
      this.fetchVrfData(routerId); // Pass the router ID to fetch VRF data
    }
  }
  fetchVrfData(routerId: string): void {
    let routerObservable;

    switch (routerId) {
      case 'j1':
        routerObservable = this.routerService.getVrfJ1();
        break;
      case 'j2':
        routerObservable = this.routerService.getVrfJ2();
        break;
      case 'j3':
        routerObservable = this.routerService.getVrfJ3();
        break;
      case 'j4':
        routerObservable = this.routerService.getVrfJ4();
        break;
      default:
        this.errorMessage = 'Cannot get response for router ID: ' + routerId;
        return;
    }

    routerObservable.subscribe(
      data => {
        console.log('API Response:', data); // Debugging log
        // Assuming data.vrf is a string
        this.vrfSummaryData = [data.vrf]; // Wrap the vrf string in an array for display
        this.consoleOutput = data.rawOutput || '';  // Ensure rawOutput defaults to an empty string
      },
      error => {
        console.error('Error fetching VRF data:', error);
        this.errorMessage = 'Error fetching VRF data';
      }
    );
  }

}
