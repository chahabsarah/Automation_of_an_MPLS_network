import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

interface MemoryData {
  memory: string | null;
}

@Component({
  selector: 'app-memory-test',
  templateUrl: './memory-test.component.html',
  styleUrls: ['./memory-test.component.css']
})
export class MemoryTestComponent implements OnInit {
  errorMessage: string | null = null;
  memoryData: MemoryData[] = []; // Array to store memory data for each router

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.getHDData();
  }

  getHDData(): void {
    const routers = ['J1', 'J2', 'J3', 'J4'];

    routers.forEach(router => {
      this.routerService[`getMemo${router}`]().subscribe({
        next: data => {
          console.log(`Raw memory data for ${router}:`, data); // Log raw data for inspection

          // Add retrieved memory data to memoryData array
          this.memoryData.push({
            memory: data.memory // Assuming `data.memory` contains the memory info from backend
          });
        },
        error: error => this.handleError(error)
      });
    });
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'An error occurred while fetching data.';
    console.error(this.errorMessage);
  }

  getFirstNineLines(memory: string | null): string {
    if (memory) {
      return memory.split('\n').slice(1, 9).join('\n');
    }
    return ''; // Return an empty string if memory is null
  }
}
