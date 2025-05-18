import { Component, ViewChild } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPatientDetails, IUserDetails } from 'src/shared/common.constants';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';
import { PGlite } from '@electric-sql/pglite'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-patient-registration-hub',
  templateUrl: './patient-registration-hub.component.html',
  styleUrls: ['./patient-registration-hub.component.scss']
})
export class PatientRegistrationHubComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  dataSource!: MatTableDataSource<any>;
  public searchText!: string;
  public filterForm!: FormGroup;
  public isFilterApplied = false;
  public user!: SocialUser;
  public db!: PGlite;
  public isLoading = false;
  pageSize = 7;
  pageSizeOptions = [7, 12, 15];
  displayedColumns = ['FullName', 'Email', 'Phone', 'Address', 'TreatmentInformation', 'DoctorName'];
  public gridData: IPatientDetails[] = [];

  constructor(private dialog: MatDialog, private router: Router, private fb: FormBuilder){
    this.initDb();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    if(!localStorage.getItem("userDetails")){
      this.router.navigateByUrl("/login");
    }

    this.filterForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl('')
    })
    this.dataSource = new MatTableDataSource(this.gridData);
  }

  filter(event: any): void {
    this.dataSource.filter = 
        event.target.value.trim().toLowerCase();
  }

  openRegistrationModel(){
    this.dialog.open(AddPatientModalComponent, {
      disableClose: true,
      width: '500px',
      height: 'max',
      data: {
        callback: (formValue: IPatientDetails) => {
          const query = `Insert into Patient (userId, name, email, phone, address, treatmentInfo, doctorName) 
            VALUES('${formValue.userId}', '${formValue.name}','${formValue.email}','${formValue.phone.toString()}','${formValue.address}','${formValue.treatmentInfo}','${formValue.doctorName}');`
          this.insertData(query);
          this.dialog.closeAll();
        }
      }
    })
  }

  clearFilters(){
    this.filterForm.reset();
    this.isFilterApplied = false;
    this.initDb();
  }

  async applyFilters(){
    let query;
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem("userDetails") ?? "") as IUserDetails;
    user.userId = user.userId ?? 'commonUser';
    this.isFilterApplied = true;

    if(this.filterForm?.value?.name && this.filterForm?.value?.email){
      query = `Select * from Patient where name like '%${this.filterForm?.value?.name}%' and email like '%${this.filterForm?.value?.email}%' and UserId = '${user.userId}'`;
    }
    else if(this.filterForm?.value?.name){
      query = `Select * from Patient where name like '%${this.filterForm?.value?.name}%' and UserId = '${user.userId}'`;
    }
    else if(this.filterForm?.value?.email){
      query = `Select * from Patient where email like '%${this.filterForm?.value?.email}%' and UserId = '${user.userId}'`
    }
    else{
      query = `Select * from Patient Where UserId = '${user.userId}'`;
      this.isFilterApplied = true;
    }

    

    const result = await this.db.query(query);
    this.gridData = [];
    result.rows.forEach(x => {
      this.gridData= [...this.gridData, x as IPatientDetails];
    });

    this.dataSource = new MatTableDataSource(this.gridData);
    this.menuTrigger.closeMenu();
    this.isLoading = false;
  }

  private async insertData(query: string){
    await this.db.exec(query);
    this.initDb();
  }

  private async initDb() {
    this.isLoading = true;
    const response = await fetch('/assets/pglite/pglite.wasm');
    const wasmArrayBuffer = await response.arrayBuffer();
    const wasmModule = await WebAssembly.compile(wasmArrayBuffer);

    const fsResponse = await fetch('/assets/pglite/pglite.data');
    const fsBundle = await fsResponse.blob();

    this.db = new PGlite({
      wasmModule,
      fsBundle,
      dataDir: 'idb://my-patient-db',
    });
    await this.db.exec(`CREATE TABLE IF NOT EXISTS Patient (
      userId TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      treatmentInfo TEXT,
      doctorName TEXT
    );`);

    // await this.db.query(`INSERT INTO Patient (id, name) VALUES (1,'Alice'), (2,'Bob')`);
    const user = JSON.parse(localStorage.getItem("userDetails") ?? "") as IUserDetails;
    user.userId = user.userId ?? 'commonUser';
    const result = await this.db.query(`SELECT * FROM Patient where UserId = '${user.userId}'`);
    this.gridData = [];
    result.rows.forEach(x => {
      this.gridData= [...this.gridData, x as IPatientDetails];
    });

    this.dataSource = new MatTableDataSource(this.gridData);
    this.isLoading = false;
  }

 
}
