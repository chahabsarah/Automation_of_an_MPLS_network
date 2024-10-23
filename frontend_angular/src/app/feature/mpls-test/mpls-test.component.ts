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
        this.mplsSummaryData = this.parseMplsOutput(data.mpls);
      },
      error => {
        console.error('Erreur lors de la récupération des données MPLS :', error);
        this.errorMessage = 'Erreur lors de la récupération des données MPLS';
      }
    );
  }

  // Exemple de méthode pour analyser l'output
  parseMplsOutput(output: string): any[] {
    const lines = output.split('\n');
    const mplsData = []; // Créez un tableau local

    for (const line of lines) {
      const match = line.match(/(\d+)\s+\*\[(\w+\/\d+)\]\s+(\d+:\d+:\d+),\s+metric\s+(\d+)/);
      if (match) {
        const label = match[1];
        const type = match[2];
        const duration = match[3];
        const metric = match[4];
        const nextHopMatch = line.match(/(?:> to (\S+) via (\S+))/);

        mplsData.push({
          label,
          nextHop: nextHopMatch ? nextHopMatch[1] : 'N/A',
          outgoingInterface: nextHopMatch ? nextHopMatch[2] : 'N/A',
          type,
          duration,
          metric,
          action: 'Receive' // Par défaut, sinon vous pouvez analyser d'autres actions
        });
      }
    }

    // Gérer le cas où aucune route n'est trouvée
    if (mplsData.length === 0) {
      this.errorMessage = "Aucune route MPLS trouvée dans les données.";
    } else {
      this.errorMessage = ""; // Réinitialiser l'erreur
    }

    return mplsData; // Retournez les données MPLS analysées
  }
}
