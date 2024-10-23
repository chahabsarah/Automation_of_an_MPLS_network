import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { RouterConfig } from '../shared/router.config';
import { MatDialog } from "@angular/material/dialog";
import { BackendServices } from '../BackendServices';
import { TableColumn } from "../shared/TableColumn";
import { ActivatedRoute } from '@angular/router';
import { RouterModalComponent } from './router-modal/router-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.css']
})
export class DentalComponent implements OnInit, AfterViewInit {
  constructor(
    private backendService: BackendServices,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  id: number;
  isEditMode = false;
  public tabs: TableColumn[] = [
    new TableColumn('host', 'hostToDisplay'),
    new TableColumn('Port', 'portToDisplay'),
    new TableColumn('Username', 'usernameToDisplay'),
    new TableColumn('Password', 'passwordToDisplay'),
    new TableColumn('', 'edit')
  ];

  public combinedData = new MatTableDataSource<RouterConfig>();

  openModal(action: string): void {
    const dialogRef = this.dialog.open(RouterModalComponent, {
      data: {
        parentComponent:this
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Add logic to update the table if needed
    });
  }

  get columnProperties(): string[] {
    return this.tabs.map(col => col.property);
  }

  ngAfterViewInit() {
    // Load all router configurations after the view is initialized
    this.reloadData();
  }

  reloadData(): void {
    this.backendService.getAllConfigurations().subscribe(
      (data: RouterConfig[]) => {
        this.combinedData = RouterConfig.mapCombineData(data); 
      });
  }

  deleteRouter(id: number): void {
    // Call the deleteConfiguration method of the backend service
    this.backendService.deleteConfiguration(id).subscribe(
      (response) => {
        // If deletion is successful, remove the item from the data source
        this.combinedData.data = this.combinedData.data.filter(item => item.id !== id);
        console.log('Router deleted successfully');
      },
      (error) => {
        console.error('Error deleting router:', error);
        // Handle error
      }
    );
  }
  connectRouter(id: number): void {
    // Call the new API service method to connect
    this.backendService.getRouterConfigData(id).subscribe(
      (response) => {
        this.router.navigate(['/staff']);
        console.log('Router connected successfully');
        // You may update the UI or perform other actions here
      },
      (error) => {
        console.error('Error connecting router:', error);
        // Handle error
      }
    );
  }


  ngOnInit(): void {
  }
}
