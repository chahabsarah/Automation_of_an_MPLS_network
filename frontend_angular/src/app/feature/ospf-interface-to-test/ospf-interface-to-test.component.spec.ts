import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspfInterfaceToTestComponent } from './ospf-interface-to-test.component';

describe('OspfInterfaceToTestComponent', () => {
  let component: OspfInterfaceToTestComponent;
  let fixture: ComponentFixture<OspfInterfaceToTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OspfInterfaceToTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OspfInterfaceToTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
