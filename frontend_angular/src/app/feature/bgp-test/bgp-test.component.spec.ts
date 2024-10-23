import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgpTestComponent } from './bgp-test.component';

describe('BgpTestComponent', () => {
  let component: BgpTestComponent;
  let fixture: ComponentFixture<BgpTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BgpTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BgpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
