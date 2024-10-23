import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrfTestComponent } from './vrf-test.component';

describe('VrfTestComponent', () => {
  let component: VrfTestComponent;
  let fixture: ComponentFixture<VrfTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VrfTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
