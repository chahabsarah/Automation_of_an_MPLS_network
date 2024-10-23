import { Component, Inject, OnInit } from '@angular/core';
import { BackendServices } from '../../BackendServices';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-network-modal-component',
  templateUrl: './network-modal-component.component.html',
  styleUrl: './network-modal-component.component.css'
})
export class NetworkModalComponentComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private backendService: BackendServices,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private dialogRef: MatDialogRef<NetworkModalComponentComponent>) {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      clientname: ['', Validators.required],
      interface: ['', Validators.required],
      ip_address: ['', Validators.required],
      subnet: ['', Validators.required],
      vrf: ['', Validators.required],
      members_target: ['', Validators.required],
      route_distinguisher: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      // Call the service method to send data to Django API
      this.backendService.Networkconfiguration(this.form.value).subscribe(
        response => {
          console.log(response);
        
          
        },
      );
      this.dialogRef.close();
    
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}