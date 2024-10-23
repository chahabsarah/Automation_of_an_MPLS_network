import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-memory-test',
  templateUrl: './memory-test.component.html',
  styleUrl: './memory-test.component.css'
})
export class MemoryTestComponent implements OnInit {
  memoDataJ1: any;
  memoDataJ2: any;
  memoDataJ3: any;
  memoDataJ4: any;
  errorMessage: string | null = null;

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.getHDData();
  }

  getHDData(): void {
    this.routerService.getMemoJ1().subscribe({
      next: (data) => this.memoDataJ1 = data.memory,
      error: (error) => this.handleError(error)
    });

    this.routerService.getMemoJ2().subscribe({
      next: (data) => this.memoDataJ2 = data.memory,
      error: (error) => this.handleError(error)
    });

    this.routerService.getMemoJ3().subscribe({
      next: (data) => this.memoDataJ3 = data.memory,
      error: (error) => this.handleError(error)
    });

    this.routerService.getMemoJ4().subscribe({
      next: (data) => this.memoDataJ4 = data.memory,
      error: (error) => this.handleError(error)
    });
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la récupération des données.';
    console.error(this.errorMessage);
  }
}
