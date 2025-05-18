import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationHubComponent } from './patient-registration-hub.component';

describe('PatientRegistrationHubComponent', () => {
  let component: PatientRegistrationHubComponent;
  let fixture: ComponentFixture<PatientRegistrationHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientRegistrationHubComponent]
    });
    fixture = TestBed.createComponent(PatientRegistrationHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
