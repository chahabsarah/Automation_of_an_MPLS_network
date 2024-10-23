import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceConfigurationComponent } from './reference-configuration.component';

describe('ReferenceConfigurationComponent', () => {
  let component: ReferenceConfigurationComponent;
  let fixture: ComponentFixture<ReferenceConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenceConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferenceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
