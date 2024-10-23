import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuTestComponent } from './cpu-test.component';

describe('CpuTestComponent', () => {
  let component: CpuTestComponent;
  let fixture: ComponentFixture<CpuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
