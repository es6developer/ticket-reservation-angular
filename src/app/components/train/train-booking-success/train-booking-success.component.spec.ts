import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainBookingSuccessComponent } from './train-booking-success.component';

describe('TrainBookingSuccessComponent', () => {
  let component: TrainBookingSuccessComponent;
  let fixture: ComponentFixture<TrainBookingSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainBookingSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainBookingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
