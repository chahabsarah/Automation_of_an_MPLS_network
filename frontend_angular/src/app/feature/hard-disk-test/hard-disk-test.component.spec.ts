import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardDiskTestComponent } from './hard-disk-test.component';

describe('HardDiskTestComponent', () => {
  let component: HardDiskTestComponent;
  let fixture: ComponentFixture<HardDiskTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardDiskTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HardDiskTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
