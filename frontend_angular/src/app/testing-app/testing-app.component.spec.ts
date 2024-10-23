import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingAppComponent } from './testing-app.component';

describe('TestingAppComponent', () => {
  let component: TestingAppComponent;
  let fixture: ComponentFixture<TestingAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
