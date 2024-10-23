import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-cpu-test',
  templateUrl: './cpu-test.component.html',
  styleUrls: ['./cpu-test.component.css']
})
export class CpuTestComponent implements OnInit {
  cpuDataJ1: any;
  cpuDataJ2: any;
  cpuDataJ3: any;
  cpuDataJ4: any;
  errorMessage: string | null = null;

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {

    this.getCpuData();
  }


  getCpuData(): void {
    this.routerService.getCpuJ1().subscribe({
      next: (data) => this.cpuDataJ1 = data.proc,
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ2().subscribe({
      next: (data) => this.cpuDataJ2 = data.proc,
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ3().subscribe({
      next: (data) => this.cpuDataJ3 = data.proc,
      error: (error) => this.handleError(error)
    });

    this.routerService.getCpuJ4().subscribe({
      next: (data) => this.cpuDataJ4 = data.proc,
      error: (error) => this.handleError(error)
    });
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la récupération des données.';
    console.error(this.errorMessage);
  }
}
