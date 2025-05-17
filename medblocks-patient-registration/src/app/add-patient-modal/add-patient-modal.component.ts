import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { I } from '@electric-sql/pglite/dist/pglite-Ca7Yuh0T';
import { IUserDetails } from 'src/shared/common.constants';

@Component({
  selector: 'app-add-patient-modal',
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.scss']
})
export class AddPatientModalComponent {
  public form!: FormGroup
  constructor(public dialogRef: MatDialogRef<AddPatientModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void{
    let userDetail = JSON.parse(localStorage.getItem("userDetails") ?? "") as IUserDetails
    this.form = this.fb.group({
      userId: new FormControl(userDetail?.userId ?? 'commonUser'),
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: new FormControl('', [Validators.required, Validators.pattern("[- +()0-9]{10,}")]),
      address: new FormControl(''),
      treatmentInfo: new FormControl(''),
      doctorName: new FormControl('')
    })
  }

  closeDialog() {
    this.dialogRef.close('Closed!');
  }

  onSubmit(){
    let result = JSON.parse(JSON.stringify(this.form.value)) as IUserDetails;
    this.data.callback(result);
  }
}
