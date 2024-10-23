import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspfTestComponent } from './ospf-test.component';

describe('OspfTestComponent', () => {
  let component: OspfTestComponent;
  let fixture: ComponentFixture<OspfTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OspfTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OspfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
