import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientRegistrationHubComponent } from './patient-registration-hub/patient-registration-hub.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { FilterGridPipe } from './filter-grid.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    PatientRegistrationHubComponent,
    SideBarComponent,
    FilterGridPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
