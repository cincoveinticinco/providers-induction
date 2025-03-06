import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SstFormComponent } from './sst-form.component';

describe('SstFormComponent', () => {
  let component: SstFormComponent;
  let fixture: ComponentFixture<SstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
