import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegistrationHubComponent } from './patient-registration-hub/patient-registration-hub.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'patient-registration',
    component: PatientRegistrationHubComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
