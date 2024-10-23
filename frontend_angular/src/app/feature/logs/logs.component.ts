import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: string[] = [];
 

  constructor(private logsService: RouterService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.logsService.getAllLogs().subscribe(
      (data: any) => {
        console.log('Fetched logs:', data);
        this.logs = data.logs; // Accessing the logs array
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }


}
