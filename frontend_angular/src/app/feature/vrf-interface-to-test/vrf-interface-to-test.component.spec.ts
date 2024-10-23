import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrfInterfaceToTestComponent } from './vrf-interface-to-test.component';

describe('VrfInterfaceToTestComponent', () => {
  let component: VrfInterfaceToTestComponent;
  let fixture: ComponentFixture<VrfInterfaceToTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VrfInterfaceToTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrfInterfaceToTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
