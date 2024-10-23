import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaisonResultComponent } from './comparaison-result.component';

describe('ComparaisonResultComponent', () => {
  let component: ComparaisonResultComponent;
  let fixture: ComponentFixture<ComparaisonResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparaisonResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparaisonResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
