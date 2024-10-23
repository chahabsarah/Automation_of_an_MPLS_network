import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css'] // Assurez-vous d'avoir du style ici si nécessaire
})
export class RouterComponent implements OnInit {

  routerData: any;
  parsedInterfaces: any[] = [];
  pingStatus: any = { success: false, message: '' };
  errorMessage: string = ''; // Pour gérer les erreurs visuellement

  constructor(private routerService: RouterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');

    if (routerId) {
      this.loadRouterData(routerId);
    }
  }

  loadRouterData(routerId: string): void {
    let routerObservable;
    switch (routerId) {
      case 'r1':
        routerObservable = this.routerService.getRouterR1();
        break;
      case 'r2':
        routerObservable = this.routerService.getRouterR2();
        break;
      case 'r3':
        routerObservable = this.routerService.getRouterR3();
        break;
      case 'r4':
        routerObservable = this.routerService.getRouterR4();
        break;
      case 'j1':
        routerObservable = this.routerService.getInterfacesBriefJ1();
        break;
      case 'j2':
        routerObservable = this.routerService.getInterfacesBriefJ2();
        break;
      case 'j3':
        routerObservable = this.routerService.getInterfacesBriefJ3();
        break;
      case 'j4':
        routerObservable = this.routerService.getInterfacesBriefJ4();
        break;
      default:
        this.errorMessage = 'Routeur non reconnu';
        return;
    }

    routerObservable.subscribe(
      data => {
        this.errorMessage = ''; // Réinitialiser le message d'erreur en cas de succès
        if (data && data.interfaces) {
          this.routerData = data;
          this.parsedInterfaces = this.parseInterfaces(data.interfaces);
        } else {
          this.parsedInterfaces = [];
          this.errorMessage = 'Aucune interface trouvée dans les données';
        }

        if (data && data.ping) {
          this.pingStatus = this.parsePingResults(data.ping);
        } else {
          this.pingStatus = { success: false, message: 'Aucune donnée de ping disponible' };
        }
      },
      error => {
        console.error('Erreur lors de la récupération des données du routeur', error);
        this.errorMessage = 'Erreur lors de la récupération des données du routeur';
      }
    );
  }

  parseInterfaces(interfacesString: string): any[] {
    const interfaceLines = interfacesString.split('\n').filter(line => line.trim() !== '');
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

  parsePingResults(pingString: string): any {
    if (pingString.includes('success')) {
      return { success: true, message: '' };
    } else {
      return { success: false, message: pingString };
    }
  }
}
