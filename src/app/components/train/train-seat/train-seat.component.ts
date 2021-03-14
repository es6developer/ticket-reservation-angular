import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-train-seat',
  templateUrl: './train-seat.component.html',
  styleUrls: ['./train-seat.component.css'],
})
export class TrainSeatComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}
  train_id: string = '';
  trainDetail: any = {};
  seats: any = [];
  selectedDate: Date = new Date();
  today: Date = new Date();
  total_cost: number = 0;
  isSubmitted: Boolean = false;
  isLoading:Boolean = true;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.train_id = params.train_id;
      this.getTrainDetails();
    });
  }

  getTrainDetails = () => {
    this.isLoading = true;
    let date = this.datePipe.transform(
      new Date(this.selectedDate),
      'MM-dd-yyyy'
    );
    let reqObj = {
      id: this.train_id,
      date: date,
    };
    this.apiService
      ._post(`train/seat-availability`, reqObj)
      .subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        if (res.status) {
          this.trainDetail = res.body.train;
          this.seats = res.body.seats;
          this.total_cost = 0;
        }
      });
  };
  calculateTotalCost = () => {
    this.total_cost = 0;
    this.seats.map((item) => {
      if (item.isSelected) {
        this.total_cost += this.trainDetail.cost;
      }
    });
  };

  selectSeat = (seat) => {
    if (!seat.isBooked) {
      seat.isSelected = !seat.isSelected;
    }
    this.calculateTotalCost();
  };

  bookTicket = () => {
    let seats = [];
    for (const iterator of this.seats) {
      if (iterator.isSelected) {
        seats.push(iterator._id);
      }
    }
    if (seats.length == 0) {
      return this.toastr.error('Please select seats');
    }
    let user = sessionStorage.getItem('user_id');
    let date = this.datePipe.transform(
      new Date(this.selectedDate),
      'MM-dd-yyyy'
    );
    let object = {
      train: this.train_id,
      user: user,
      seats: seats,
      total_cost: this.total_cost,
      date: date,
    };
    console.log('object', object);
    this.isSubmitted = true;
    this.apiService._post('ticket/book', object).subscribe((res) => {
      this.isSubmitted = false;
      console.log(res);
      if (res.status) {
        this.toastr.success('Selected seats has been booked!.');
        this.router.navigate(['/success']);
      } else {
        this.toastr.error(res.message);
      }
    });
  };
}
