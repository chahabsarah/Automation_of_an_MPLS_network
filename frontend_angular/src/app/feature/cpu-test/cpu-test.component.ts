import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-cpu-test',
  templateUrl: './cpu-test.component.html',
  styleUrls: ['./cpu-test.component.css']
})
export class CpuTestComponent implements OnInit {
  cpuDataJ1: any[] = [];
  cpuDataJ2: any[] = [];
  cpuDataJ3: any[] = [];
  cpuDataJ4: any[] = [];
  errorMessage: string | null = null;

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.getCpuData();
  }

  getCpuData(): void {
    this.routerService.getCpuJ1().subscribe({
      next: (data) => this.cpuDataJ1 = this.extractProcesses(data.proc),
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ2().subscribe({
      next: (data) => this.cpuDataJ2 = this.extractProcesses(data.proc),
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ3().subscribe({
      next: (data) => this.cpuDataJ3 = this.extractProcesses(data.proc),
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ4().subscribe({
      next: (data) => this.cpuDataJ4 = this.extractProcesses(data.proc),
      error: (error) => this.handleError(error)
    });
  }

  // Fonction pour extraire les processus à partir de la réponse brute
  extractProcesses(data: string): any[] {
    // Diviser les lignes
    const lines = data.split('\n');

    // Filtrer les lignes qui correspondent aux processus CPU (ex: celles qui commencent par un nombre)
    const processes = lines.filter(line => /^\s*\d+/.test(line));

    // Transformer chaque ligne en un objet processus
    return processes.map(line => {
      const parts = line.trim().split(/\s+/); // Divise la ligne en utilisant les espaces comme séparateurs
      return {
        PID: parts[0],
        USERNAME: parts[1],
        THR: parts[2],
        PRI: parts[3],
        NICE: parts[4],
        SIZE: parts[5],
        RES: parts[6],
        STATE: parts[7],
        TIME: parts[8],
        WCPU: parts[9],
        COMMAND: parts[10]
      };
    });
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la récupération des données.';
    console.error(this.errorMessage);
  }
}
