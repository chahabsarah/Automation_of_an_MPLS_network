import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent {
  logs: string[] = [];
  errorCount: number = 0;
  warningCount: number = 0;

  constructor(private logsService: RouterService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.logsService.getAllLogs().subscribe(
      (data: any) => {
        console.log('Fetched logs:', data);
        this.logs = data.logs; // Accessing the logs array
        this.countErrorsAndWarnings(); // Count errors and warnings after logs are fetched and assigned
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }

  countErrorsAndWarnings(): void {
    this.errorCount = this.logs.filter(log => log.toLowerCase().includes('error')).length;
    this.warningCount = this.logs.filter(log => log.toLowerCase().includes('warning')).length;
    console.log(`Error Count: ${this.errorCount}, Warning Count: ${this.warningCount}`); // Log counts for debugging
  }
}
