import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceFormComponent } from './compliance-form.component';

describe('ComplianceFormComponent', () => {
  let component: ComplianceFormComponent;
  let fixture: ComponentFixture<ComplianceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
