import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ospf-test',
  templateUrl: './ospf-test.component.html',
  styleUrls: ['./ospf-test.component.css']
})
export class OspfTestComponent implements OnInit {
  ospfData: any;
  parsedospf: any[] = [];
  pingStatus: any = { success: false, message: '' };
  errorMessage: string = '';

  constructor(private routerService: RouterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');

    if (routerId) {
      this.loadospfData(routerId);
    }
  }

  loadospfData(routerId: string): void {
    let routerObservable;
    switch (routerId) {
      case 'j1':
        routerObservable = this.routerService.getOspfJ1();
        break;
      case 'j2':
        routerObservable = this.routerService.getOspfJ2();
        break;
      case 'j3':
        routerObservable = this.routerService.getOspfJ3();
        break;
      case 'j4':
        routerObservable = this.routerService.getOspfJ4();
        break;
      default:
        this.errorMessage = 'Cannot get response.';
        return;
    }

    routerObservable.subscribe(
      data => {
        this.errorMessage = '';
        if (data && data.ospf) {
          this.ospfData = data;
          this.parsedospf = this.parseOspf(data.ospf);
        } else {
          this.parsedospf = [];
          this.errorMessage = 'No data found.';
        }
      },
      error => {
        console.error('Error fetching router data', error);
        this.errorMessage = 'Error fetching router data.';
      }
    );
  }

  parseOspf(ospfString: string): any[] {
    const interfaceLines = ospfString.split('\n')
      .filter(line => line.trim() !== '' && !line.includes('admin>')&& !line.includes('{') ); // Exclude unwanted lines
    return interfaceLines.map(line => {
      const [interfaceName, ipAddress, , , status, protocol] = line.trim().split(/\s+/);
      return {
        interface: interfaceName,
        ip: ipAddress !== 'unassigned' ? ipAddress : 'No IP',
        status: status === 'administratively' ? 'Down' : status,
        protocol: protocol === 'down' ? 'Inactive' : 'Active',
      };
    });
  }
}
