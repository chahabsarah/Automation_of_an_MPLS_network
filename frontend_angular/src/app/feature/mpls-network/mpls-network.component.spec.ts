import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPLSNetworkComponent } from './mpls-network.component';

describe('MPLSNetworkComponent', () => {
  let component: MPLSNetworkComponent;
  let fixture: ComponentFixture<MPLSNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MPLSNetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MPLSNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
