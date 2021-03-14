import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css'],
})
export class TrainListComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  trainList: any = [];
  start_point: string = '';
  end_point: string = '';
  date: Date;
  startPointArray = [];
  endPointArray = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.start_point = params.start_point;
      this.end_point = params.end_point;
    });
    this.searchTrain();
  }

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
    let reqObj = { start_point: this.start_point, end_point: this.end_point };
    this.apiService._post('train/search', reqObj).subscribe((res) => {
      if (res.status) {
        this.trainList = res.body;
      }
    });
  };
  selectTrain = (train) => {
    this.router.navigate(['/home/train/seat-availability'], {
      queryParams: { train_id: train._id, train_name: train.train_name },
      queryParamsHandling: 'merge',
    });
  };
}
