import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-registration-hub',
  templateUrl: './patient-registration-hub.component.html',
  styleUrls: ['./patient-registration-hub.component.scss']
})
export class PatientRegistrationHubComponent {
  public searchText!: string;
  public gridData = [
    {
      id: 1,
      name: "Hisham",
      email: "phisham100@gmail.com",
      phone: "1234567889",
      address: "Abc house, Kozhikode, India",
      doctorName: "The doctor"
    },
    {
      id: 2,
      name: "Raj",
      email: "phisham101@gmail.com",
      phone: "1234567889",
      address: "Abc house, Kozhikode, India",
      doctorName: "Deva"
    },
    {
      id: 3,
      name: "Haris",
      email: "phisham102@gmail.com",
      phone: "1234567889",
      address: "Abc house, Kozhikode, India",
      doctorName: "Mannadiyar"
    },
    {
      id: 4,
      name: "Hafiz",
      email: "phisham104@gmail.com",
      phone: "1234567889",
      address: "Abc house, Kozhikode, India",
      doctorName: "Sarjin"
    },
  ]
}
