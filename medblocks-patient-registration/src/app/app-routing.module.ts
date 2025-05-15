import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegistrationHubComponent } from './patient-registration-hub/patient-registration-hub.component';

const routes: Routes = [
  {
    path: 'patient-registration',
    component: PatientRegistrationHubComponent
  },
  {
    path: '',
    redirectTo: 'patient-registration',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
