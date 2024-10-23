import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgpInterfaceToTestComponent } from './bgp-interface-to-test.component';

describe('BgpInterfaceToTestComponent', () => {
  let component: BgpInterfaceToTestComponent;
  let fixture: ComponentFixture<BgpInterfaceToTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BgpInterfaceToTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BgpInterfaceToTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
