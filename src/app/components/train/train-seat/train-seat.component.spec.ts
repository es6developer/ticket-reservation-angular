import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSeatComponent } from './train-seat.component';

describe('TrainSeatComponent', () => {
  let component: TrainSeatComponent;
  let fixture: ComponentFixture<TrainSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
