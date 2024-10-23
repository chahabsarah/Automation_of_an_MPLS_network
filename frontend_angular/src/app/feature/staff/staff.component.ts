import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NetworkConfiguration } from '../shared/network.config';
import { MatDialog } from "@angular/material/dialog";
import { BackendServices } from '../BackendServices';
import { TableColumn } from "../shared/TableColumn";
import { ActivatedRoute } from '@angular/router';
import { NetworkModalComponentComponent } from './network-modal-component/network-modal-component.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit, AfterViewInit {
  constructor(
    private backendService: BackendServices,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  id: number;
  isEditMode = false;
  public tabs: TableColumn[] = [
    new TableColumn('Client name', 'clientnameToDisplay'),
    new TableColumn('Interface', 'interfaceToDisplay'),
    new TableColumn('Ip address', 'ipadressToDisplay'),
    new TableColumn('Subnet', 'subnetToDisplay'),
    new TableColumn('VRF', 'vrfToDisplay'),
    new TableColumn('Members Target', 'memebertargetToDisplay'),
    new TableColumn('route distinguisher', 'routedisToDisplay'),
    new TableColumn('status', 'statusToDisplay'),
    new TableColumn('', 'edit')
  ];

  public combinedData = new MatTableDataSource<NetworkConfiguration>();



  get columnProperties(): string[] {
    return this.tabs.map(col => col.property);
  }

  ngAfterViewInit() {
    // Load all router configurations after the view is initialized
    this.reloadData();
  }

  reloadData(): void {
    this.backendService.getAllNetworkConfigurations().subscribe(
      (data: NetworkConfiguration[]) => {
        this.combinedData = NetworkConfiguration.mapCombineData(data); 
      });
  }
  openModal(action: string): void {
    const dialogRef = this.dialog.open(NetworkModalComponentComponent, {
      data: {
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Add logic to update the table if needed
    });
  }
  deleteRouter(id: number): void {
    // Call the deleteConfiguration method of the backend service
    this.backendService.deleteNetworkConfiguration(id).subscribe(
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

  ngOnInit(): void {
  }
}
