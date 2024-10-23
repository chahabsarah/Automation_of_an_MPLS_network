import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';

// Define interfaces for the parsed BGP data
interface Neighbor {
  neighborIP: string;
  peerAS: string;
}

interface BgpGroup {
  type: string;
  localAddress: string;
  neighbors: Neighbor[];
}

// Define the structure for the parsed BGP output
interface ParsedBgpEntry {
  group: string;
  type: string;
  localAddress: string;
  neighborIP: string;
  peerAS: string;
}

@Component({
  selector: 'app-bgp-test',
  templateUrl: './bgp-test.component.html',
  styleUrls: ['./bgp-test.component.css']
})
export class BgpTestComponent implements OnInit {
  bgpData: any;  // The raw BGP data from the server
  bgpOutput: string = '';  // To hold the raw command output in readable format
  parsedBgp: ParsedBgpEntry[] = [];  // To hold parsed BGP data as an array
  errorMessage: string = '';

  constructor(private routerService: RouterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');
    if (routerId) {
      this.fetchBgpData(routerId);
    }
  }

  fetchBgpData(routerId: string): void {
    let routerObservable;

    // Adjust these method calls to your routerService methods
    switch (routerId) {
      case 'j1':
        routerObservable = this.routerService.getBgpJ1();
        break;
      case 'j2':
        routerObservable = this.routerService.getBgpJ2();
        break;
      case 'j3':
        routerObservable = this.routerService.getBgpJ3();
        break;
      case 'j4':
        routerObservable = this.routerService.getBgpJ4();
        break;
      default:
        this.errorMessage = 'Cannot get response for router ID: ' + routerId;
        return;
    }

    routerObservable.subscribe(
      data => {
        this.bgpData = data;  // Assuming you get the raw BGP data here
        console.log('BGP Data received:', this.bgpData);
        this.bgpOutput = data.vrf;  // Extract the output as a string

        // Log the BGP output to see its format
        console.log('BGP Output:', this.bgpOutput);

        // Check if bgpOutput is defined and is a string
        if (typeof this.bgpOutput === 'string') {
          this.parseBgpOutput(this.bgpOutput);
        } else {
          this.errorMessage = 'Invalid BGP output format';
        }
      },
      error => {
        console.error('Error fetching BGP data:', error);
        this.errorMessage = 'Error fetching BGP data';
      }
    );
  }


  parseBgpOutput(output: string): void {
    const lines = output.split('\n').map(line => line.trim()).filter(line => line); // Split and clean
    const group: { [key: string]: BgpGroup } = {};
    let currentGroup: string | null = null;

    lines.forEach(line => {
      if (line.startsWith('group ')) {
        currentGroup = line.split(' ')[1]; // Get group name
        group[currentGroup] = { type: '', localAddress: '', neighbors: [] };
      } else if (line.includes('type')) {
        if (currentGroup) {
          group[currentGroup].type = line.split(' ')[2]; // Get type
        }
      } else if (line.includes('local-address')) {
        if (currentGroup) {
          group[currentGroup].localAddress = line.split(' ')[1]; // Get local address
        }
      } else if (line.startsWith('neighbor')) {
        const parts = line.split(' ');
        const neighborIP = parts[1];
        const peerAS = parts[3];
        if (currentGroup) {
          group[currentGroup].neighbors.push({ neighborIP, peerAS }); // Add neighbor
        }
      }
    });

    // Convert grouped data into an array for the table
    this.parsedBgp = Object.entries(group).flatMap(([key, value]) => {
      return value.neighbors.map(neighbor => ({
        group: key,
        type: value.type,
        localAddress: value.localAddress,
        neighborIP: neighbor.neighborIP,
        peerAS: neighbor.peerAS
      }));
    });
  }
}
