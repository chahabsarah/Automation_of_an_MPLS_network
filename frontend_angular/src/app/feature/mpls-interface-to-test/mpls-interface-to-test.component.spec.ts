import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MplsInterfaceToTestComponent } from './mpls-interface-to-test.component';

describe('MplsInterfaceToTestComponent', () => {
  let component: MplsInterfaceToTestComponent;
  let fixture: ComponentFixture<MplsInterfaceToTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MplsInterfaceToTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MplsInterfaceToTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
