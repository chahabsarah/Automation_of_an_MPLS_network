import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePingTestComponent } from './interface-ping-test.component';

describe('InterfacePingTestComponent', () => {
  let component: InterfacePingTestComponent;
  let fixture: ComponentFixture<InterfacePingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfacePingTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterfacePingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
