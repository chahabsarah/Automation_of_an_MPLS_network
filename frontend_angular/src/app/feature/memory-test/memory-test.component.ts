import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

interface MemoryData {
  totalMemory: string;
  reservedMemory: string;
  wiredMemory: string;
  activeMemory: string;
  inactiveMemory: string;
  cacheMemory: string;
  freeMemory: string;
}

@Component({
  selector: 'app-memory-test',
  templateUrl: './memory-test.component.html',
  styleUrls: ['./memory-test.component.css']
})
export class MemoryTestComponent implements OnInit {
  memoData: { [key: string]: MemoryData | null } = {
    J1: null,
    J2: null,
    J3: null,
    J4: null
  };
  errorMessage: string | null = null;

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.getHDData();
  }

  getHDData(): void {
    const routers = ['J1', 'J2', 'J3', 'J4'];

    routers.forEach(router => {
      this.routerService[`getMemo${router}`]().subscribe({
        next: (data) => {
          this.memoData[router] = this.extractMemoryData(data);
        },
        error: (error) => this.handleError(error)
      });
    });
  }

  extractMemoryData(data: any): MemoryData | null {
    if (data && typeof data === 'object') {
      return {
        totalMemory: data['Total memory'] || '0 Kbytes',
        reservedMemory: data['Reserved memory'] || '0 Kbytes',
        wiredMemory: data['Wired memory'] || '0 Kbytes',
        activeMemory: data['Active memory'] || '0 Kbytes',
        inactiveMemory: data['Inactive memory'] || '0 Kbytes',
        cacheMemory: data['Cache memory'] || '0 Kbytes',
        freeMemory: data['Free memory'] || '0 Kbytes',
      };
    } else if (typeof data === 'string') {
      const memoryData: MemoryData = {
        totalMemory: '0 Kbytes',
        reservedMemory: '0 Kbytes',
        wiredMemory: '0 Kbytes',
        activeMemory: '0 Kbytes',
        inactiveMemory: '0 Kbytes',
        cacheMemory: '0 Kbytes',
        freeMemory: '0 Kbytes',
      };

      const lines = data.split('\n');
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          const [key, value] = trimmedLine.split(':');
          if (key && value) {
            const formattedKey = key.trim().replace(/ /g, '');
            if (formattedKey in memoryData) {
              memoryData[formattedKey as keyof MemoryData] = value.trim();
            }
          }
        }
      });

      return memoryData;
    } else {
      console.error('Expected a string or an object for memory data but received:', data);
      return null;
    }
  }

  handleError(error: any): void {
    this.errorMessage = error.error ? error.error : 'Une erreur s\'est produite lors de la récupération des données.';
    console.error(this.errorMessage);
  }
}
