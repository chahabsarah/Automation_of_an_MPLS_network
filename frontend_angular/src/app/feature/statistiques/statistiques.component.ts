import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { Chart, registerables, ChartOptions } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements AfterViewInit {
  @ViewChild('priorityChart') priorityChart!: ElementRef; // Chart for errors and warnings
  @ViewChild('errorRateChart') errorRateChart!: ElementRef; // Chart for error rate
  @ViewChild('warningRateChart') warningRateChart!: ElementRef; // Chart for warning rate
  @ViewChild('snmpFailureChart') snmpFailureChart!: ElementRef;
  @ViewChild('craftdFailureChart') craftdFailureChart!: ElementRef;
  @ViewChild('encompassingBarChart') encompassingBarChart!: ElementRef; // New chart for all data

  logs: string[] = [];
  errorCount: number = 0;
  warningCount: number = 0;
  totalLogs: number = 3000; // Total number of logs to compare
  snmpFailureCount: number = 0;
  snmpFailureChartInstance: Chart<'pie', number[]> | undefined;
  craftdFailureCount: number = 0;
  snmpFailureChartData: number[] = [0, 0];
  chart: Chart<'bar', number[]> | undefined;
  errorRateChartInstance: Chart<'pie', number[]> | undefined; // Rename to avoid conflict
  warningRateChartInstance: Chart<'pie', number[]> | undefined; // Rename to avoid conflict
  encompassingBarChartInstance: Chart<'bar', number[]> | undefined; // New bar chart instance
  priorityChartLabels: string[] = ['Errors', 'Warnings'];
  priorityChartData: number[] = [0, 0];
  errorRateData: number[] = [0, 0]; // Data for error rate chart
  warningRateData: number[] = [0, 0]; // Data for warning rate chart
  craftdRateData: number[] = [0, 0]; // Data for warning rate chart

  priorityChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Error and Warning Statistics'
      }
    }
  };
  snmpFailureChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'SNMP Failure '
      }
    }
  };
  errorRateChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Error '
      }
    }
  };
  craftdFailureChartInstance: Chart<'pie', number[]> | undefined;

  craftdFailureChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Craftd Failures'
      }
    }
  };

  warningRateChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Warning '
      }
    }
  };

  constructor(private logsService: RouterService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  ngAfterViewInit(): void {
    this.createChart(); // Initialize the priority chart
  }

  getLogs(): void {
    this.logsService.getAllLogs().subscribe(
      (data: any) => {
        console.log('Fetched logs:', data);
        this.logs = data.logs;
        this.countErrorsAndWarnings(); // Count errors and warnings after logs are fetched
        this.updateChart(); // Update the chart data
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }

  countErrorsAndWarnings(): void {
    this.errorCount = this.logs.filter(log => log.toLowerCase().includes('error')).length;
    this.warningCount = this.logs.filter(log => log.toLowerCase().includes('warning')).length;
    this.snmpFailureCount = this.logs.filter(log => log.includes('Failed to connect to the agentx master agent (/var/run/snmpd_agentx)')).length;
    this.craftdFailureCount = this.logs.filter(log =>
      log.includes('fatal error, failed to open craft device')
    ).length;
    console.log(`Error Count: ${this.errorCount}, Warning Count: ${this.warningCount}, SNMP Failure Count: ${this.snmpFailureCount},craftdFailureCount :${this.craftdFailureCount}`);
  }


  updateChart(): void {
    this.priorityChartData = [this.errorCount, this.warningCount]; // Update chart data
    this.createChart(); // Recreate the priority chart with updated data
    this.updateRateCharts(); // Update error and warning rate charts
    this.createEncompassingBarChart(); // Create the encompassing bar chart

  }

  createEncompassingBarChart(): void {
    const ctx = (this.encompassingBarChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.encompassingBarChartInstance) {
        this.encompassingBarChartInstance.destroy(); // Destroy existing instance
      }
      this.encompassingBarChartInstance = new Chart<'bar', number[]>(ctx, {
        type: 'bar',
        data: {
          labels: ['Errors', 'Warnings', 'SNMP Failures', 'Craftd Failures'], // Labels for the new chart
          datasets: [{
            label: 'Count',
            data: [this.errorCount, this.warningCount, this.snmpFailureCount, this.craftdFailureCount], // Data for the new chart
            backgroundColor: ['#F5362B', '#009DBF', 'yellow', '#FF5733'], // Unique colors for each category
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Log Types',
              }
            },
            y: {
              title: {
                display: true,
                text: 'Count',
              },
              beginAtZero: true,
            }
          },
        },
      });
    } else {
      console.error('Failed to get context for encompassing bar chart');
    }
  }


  updateRateCharts(): void {
    this.errorRateData = [this.errorCount, this.totalLogs - this.errorCount];
    this.warningRateData = [this.warningCount, this.totalLogs - this.warningCount];
    this.snmpFailureChartData = [this.snmpFailureCount, this.totalLogs - this.snmpFailureCount]; // Mise à jour des données SNMP
    this.craftdRateData = [this.craftdFailureCount, this.totalLogs - this.craftdFailureCount]; // Updated to use craftdFailureCount


  this.createCraftdFailureChart(); // Create and update Craftd failure chart

    this.createErrorRateChart();
    this.createWarningRateChart();
    this.createSnmpFailureChart(); // Création du graphique SNMP
  }
  createCraftdFailureChart(): void {
    const ctx = (this.craftdFailureChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.craftdFailureChartInstance) {
        this.craftdFailureChartInstance.destroy(); // Détruit l'instance précédente du graphique si elle existe
      }
      this.craftdFailureChartInstance = new Chart<'pie', number[]>(ctx, {
        type: 'pie',
        data: {
          labels: ['Craftd Failures', 'Other Lines'],
          datasets: [{
            data: [this.craftdFailureCount, this.totalLogs - this.craftdFailureCount],
            backgroundColor: ['#FF5733', '#595959'],
            hoverBackgroundColor: ['#FF5733', '#595959'],
          }]
        },
        options: this.craftdFailureChartOptions,
      });
    } else {
      console.error('Failed to get context for Craftd failure chart');
    }
  }

  createSnmpFailureChart(): void {
    const ctx = (this.snmpFailureChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.snmpFailureChartInstance) {
        this.snmpFailureChartInstance.destroy(); // Détruire l'instance existante du graphique s'il existe
      }
      this.snmpFailureChartInstance = new Chart<'pie', number[]>(ctx, {
        type: 'pie',
        data: {
          labels: ['SNMP Failures', 'Other Lines'],
          datasets: [{
            data: this.snmpFailureChartData,
            backgroundColor: ['yellow', '#595959'],
            hoverBackgroundColor: ['yellow', '#595959'],
          }]
        },
        options: this.snmpFailureChartOptions,
      });
    } else {
      console.error('Failed to get context for SNMP failure chart');
    }
  }

  createChart(): void {
    const ctx = (this.priorityChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy(); // Destroy the existing chart instance if it exists
      }
      this.chart = new Chart<'bar', number[]>(ctx, {
        type: 'bar', // Change the chart type to 'bar'
        data: {
          labels: this.priorityChartLabels,
          datasets: [{
            label: 'Priority Data', // You can add a label for your dataset
            data: this.priorityChartData,
            backgroundColor: ['#F5362B', '#009DBF'], // Colors for each bar
            hoverBackgroundColor: ['#F5362B', '#009DBF'], // Hover colors for each bar
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Allow chart to adjust its aspect ratio
          layout: {
            padding: 20, // Adjust layout padding if necessary
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Categories', // X-axis title
              },
              stacked: true, // Optional: stack bars if you have multiple datasets
            },
            y: {
              title: {
                display: true,
                text: 'Values', // Y-axis title
              },
              beginAtZero: true, // Ensure Y-axis starts at zero
              stacked: true, // Optional: stack bars if you have multiple datasets
            }
          },
        },
      });
    } else {
      console.error('Failed to get context for priority chart');
    }
  }

  createErrorRateChart(): void {
    const ctx = (this.errorRateChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.errorRateChartInstance) {
        this.errorRateChartInstance.destroy(); // Destroy the existing chart instance if it exists
      }
      this.errorRateChartInstance = new Chart<'pie', number[]>(ctx, {
        type: 'pie',
        data: {
          labels: ['Errors', 'Other Lines'],
          datasets: [{
            data: this.errorRateData,
            backgroundColor: ['#F5362B', '#595959'],
            hoverBackgroundColor: ['#F5362B', '#595959'],
          }]
        },
        options: this.errorRateChartOptions,
      });
    } else {
      console.error('Failed to get context for error rate chart');
    }
  }

  createWarningRateChart(): void {
    const ctx = (this.warningRateChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.warningRateChartInstance) {
        this.warningRateChartInstance.destroy(); // Destroy the existing chart instance if it exists
      }
      this.warningRateChartInstance = new Chart<'pie', number[]>(ctx, {
        type: 'pie',
        data: {
          labels: ['Warnings', 'Other Lines'],
          datasets: [{
            data: this.warningRateData,
            backgroundColor: ['#009DBF', '#595959'],
            hoverBackgroundColor: ['#009DBF', '#595959'],
          }]
        },
        options: this.warningRateChartOptions,
      });
    } else {
      console.error('Failed to get context for warning rate chart');
    }
  }
}
