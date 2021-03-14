import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) {}

  start_point: string = '';
  end_point: string = '';
  startPointArray = [];
  endPointArray = [];
  trainList: any = [];
  ngOnInit(): void {}

  autocomplete = (event, type) => {
    console.log('event.target.value', event.target.value);
    if (type == 'start') {
      this.apiService
        ._get(`train/autocomplete?type=${type}&text=${event.target.value}`)
        .subscribe((res) => {
          if (res.status) {
            this.startPointArray = res.body;
          }
        });
    } else {
      this.apiService
        ._get(
          `train/autocomplete?type=${type}&text=${event.target.value}&startpoint=${this.start_point}`
        )
        .subscribe((res) => {
          console.log('res', res);
          if (res.status) {
            this.endPointArray = res.body;
          }
        });
    }
  };
  searchTrain = () => {
    this.router.navigate(['/home/train/list'], {
      queryParams: { start_point: this.start_point, end_point: this.end_point },
    });
  };
}
