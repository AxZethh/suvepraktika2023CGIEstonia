import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsComponent } from './checkouts.component';

describe('CheckoutsComponent', () => {
  let component: CheckoutsComponent;
  let fixture: ComponentFixture<CheckoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
