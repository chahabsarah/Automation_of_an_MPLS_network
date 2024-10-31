import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bgp-test',
  templateUrl: './bgp-test.component.html',
  styleUrls: ['./bgp-test.component.css']
})
export class BgpTestComponent {
  bgpConfig: { routerId: string, config: any }[] = [];

  constructor(private routerService: RouterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');
    if (routerId) {
      this.fetchBgpData(routerId);
    }
  }

  fetchBgpData(routerId: string) {
    this.bgpConfig = []; // Clear previous data

    switch (routerId) {
      case 'j1':
        this.routerService.getBgpJ1().subscribe(
          (data) => this.bgpConfig.push({ routerId: 'J1', config: data.bgp }),
          (error) => console.error('Error fetching BGP data for J1', error)
        );
        break;
      case 'j2':
        this.routerService.getBgpJ2().subscribe(
          (data) => this.bgpConfig.push({ routerId: 'J2', config: data.bgp }),
          (error) => console.error('Error fetching BGP data for J2', error)
        );
        break;
      case 'j3':
        this.routerService.getBgpJ3().subscribe(
          (data) => this.bgpConfig.push({ routerId: 'J3', config: data.bgp }),
          (error) => console.error('Error fetching BGP data for J3', error)
        );
        break;
      case 'j4':
        this.routerService.getBgpJ4().subscribe(
          (data) => this.bgpConfig.push({ routerId: 'J4', config: data.bgp }),
          (error) => console.error('Error fetching BGP data for J4', error)
        );
        break;
    }
  }

  formatConfig(config: any): string {
    const configString = typeof config === 'string' ? config : JSON.stringify(config, null, 2);
    const lines = configString.split('\n');

    // Slice lines from index 1 to the second to last line
    const slicedLines = lines.slice(1, -3); // Exclude first and last line
    return slicedLines.join('\n'); // Join the lines back into a single string
  }
}
