import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  tickets: any = { all: [] };
  user_id: string = sessionStorage.getItem('user_id');
  ngOnInit(): void {
    this.getTickets();
  }
  getTickets = () => {
    this.apiService
      ._get(`ticket/user?user_id=${this.user_id}&type=all`)
      .subscribe((res) => {
        if (res.status) {
          this.tickets = res.body;
        }
      });
  };
}
