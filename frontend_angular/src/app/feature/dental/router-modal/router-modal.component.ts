import { Component, Inject, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from "rxjs/operators";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { BackendServices } from '../../BackendServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-modal',
  templateUrl: './router-modal.component.html',
  styleUrl: './router-modal.component.css'
})
export class RouterModalComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private backendService: BackendServices,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<RouterModalComponent>) {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      // Call the service method to send data to Django API
      this.backendService.configureRouter(this.form.value).subscribe(
        response => {
          // Handle success response here
          console.log(response);
          // Close dialog and reload page after 5 seconds
          
        },
      );
      this.dialogRef.close();
      timer(50).subscribe(() => {
        window.location.reload();
      });
      this.router.navigate(['/staff']);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
}
