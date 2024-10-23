import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryTestComponent } from './memory-test.component';

describe('MemoryTestComponent', () => {
  let component: MemoryTestComponent;
  let fixture: ComponentFixture<MemoryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
