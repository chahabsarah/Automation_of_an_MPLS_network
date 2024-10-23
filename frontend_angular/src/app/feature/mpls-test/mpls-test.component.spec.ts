import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MplsTestComponent } from './mpls-test.component';

describe('MplsTestComponent', () => {
  let component: MplsTestComponent;
  let fixture: ComponentFixture<MplsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MplsTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MplsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
