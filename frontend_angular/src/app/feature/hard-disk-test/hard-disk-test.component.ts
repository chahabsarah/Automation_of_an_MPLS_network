import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-hard-disk-test',
  templateUrl: './hard-disk-test.component.html',
  styleUrls: ['./hard-disk-test.component.css']
})
export class HardDiskTestComponent implements OnInit {
  hdDataJ1: any[] = [];
  hdDataJ2: any[] = [];
  hdDataJ3: any[] = [];
  hdDataJ4: any[] = [];
  errorMessage: string | null = null;

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.getHDData();
  }

  getHDData(): void {
    this.routerService.getDiskJ1().subscribe({
      next: (data) => this.hdDataJ1 = this.parseDiskData(data.storage),
      error: (error) => this.handleError(error)
    });

    this.routerService.getDiskJ2().subscribe({
      next: (data) => this.hdDataJ2 = this.parseDiskData(data.storage),
      error: (error) => this.handleError(error)
    });

    this.routerService.getDiskJ3().subscribe({
      next: (data) => this.hdDataJ3 = this.parseDiskData(data.storage),
      error: (error) => this.handleError(error)
    });

    this.routerService.getDiskJ4().subscribe({
      next: (data) => this.hdDataJ4 = this.parseDiskData(data.storage),
      error: (error) => this.handleError(error)
    });
  }

  parseDiskData(data: string): any[] {
    const lines = data.trim().split('\n').slice(1); // Ignore the header line
    return lines.map(line => {
      const [filesystem, size, used, avail, capacity, mountedOn] = line.trim().split(/\s+/);
      return { filesystem, size, used, avail, capacity, mountedOn };
    });
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la récupération des données.';
    console.error(this.errorMessage);
  }
}
