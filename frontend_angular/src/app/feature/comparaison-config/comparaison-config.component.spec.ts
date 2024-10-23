import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaisonConfigComponent } from './comparaison-config.component';

describe('ComparaisonConfigComponent', () => {
  let component: ComparaisonConfigComponent;
  let fixture: ComponentFixture<ComparaisonConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparaisonConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparaisonConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
