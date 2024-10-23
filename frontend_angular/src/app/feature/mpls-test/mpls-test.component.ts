import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mpls-test',
  templateUrl: './mpls-test.component.html',
  styleUrls: ['./mpls-test.component.css']
})
export class MplsTestComponent implements OnInit {
  mplsSummaryData: any[] = [];  // To hold MPLS summary data
  consoleOutput: string = '';  // To hold the raw command output
  errorMessage: string = '';  // To hold error messages

  constructor(private routerService: RouterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id'); // Get router ID from route parameters
    if (routerId) {
      this.fetchMplsData(routerId); // Fetch MPLS data for the specified router ID
    } else {
      this.errorMessage = 'Router ID not provided';
    }
  }
  fetchMplsData(routerId: string): void {
    let routerObservable;

    switch (routerId) {
      case 'j1':
        routerObservable = this.routerService.getMplsJ1();
        break;
      case 'j2':
        routerObservable = this.routerService.getMplsJ2();
        break;
      case 'j3':
        routerObservable = this.routerService.getMplsJ3();
        break;
      case 'j4':
        routerObservable = this.routerService.getMplsJ4();
        break;
      default:
        this.errorMessage = `Router ID ${routerId} is not recognized.`;
        return;
    }

    routerObservable.subscribe(
      data => {
        console.log('Données MPLS reçues :', data);
        this.consoleOutput = data.mpls;

        // Analyse des données MPLS
        this.mplsSummaryData = this.parseMplsData(data.mpls);

        if (this.mplsSummaryData.length === 0) {
          this.errorMessage = 'Aucune route MPLS trouvée dans les données.';
        }
      },
      error => {
        console.error('Erreur lors de la récupération des données MPLS :', error);
        this.errorMessage = 'Erreur lors de la récupération des données MPLS';
      }
    );
  }


  parseMplsData(mplsString: string): any[] {
    const routes: any[] = [];
    const lines = mplsString.split('\n').filter(line => line.trim() !== ''); // Éliminer les lignes vides

    lines.forEach(line => {
      // Log des lignes traitées pour debug
      console.log('Traitement de la ligne :', line);

      // Match pour les routes avec interface (ex : '299776 *[LDP/9] ... > to 12.0.0.2 via em3.0, Pop')
      const matchWithInterface = line.match(/(\d+)\s+(\*\[.*?\])\s+.*?\s+> to (.+?) via (.+?),/);

      // Match pour les routes Receive (ex : '13 *[MPLS/0] ... Receive')
      const matchReceive = line.match(/(\d+)\s+(\*\[.*?\])\s+.*?\s+Receive/);

      if (matchWithInterface) {
        const label = matchWithInterface[1];
        const nextHop = matchWithInterface[3];
        const outgoingInterface = matchWithInterface[4];

        console.log('Route trouvée avec interface:', { label, nextHop, outgoingInterface });

        routes.push({ label, nextHop, outgoingInterface });
      } else if (matchReceive) {
        const label = matchReceive[1];
        console.log('Route Receive trouvée:', { label });

        routes.push({ label, nextHop: 'Receive', outgoingInterface: 'N/A' });
      } else {
        console.log('Aucun match pour cette ligne:', line);
      }
    });

    return routes;
  }

}
