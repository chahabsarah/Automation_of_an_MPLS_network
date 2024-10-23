import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRessourcesComponent } from './system-ressources.component';

describe('SystemRessourcesComponent', () => {
  let component: SystemRessourcesComponent;
  let fixture: ComponentFixture<SystemRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemRessourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
