import { Component, OnInit } from '@angular/core';
import { id } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  selectedType: string = 'booked';
  userDetails: any = {};
  tickets: any = { all: [], booked: [], cancelled: [] };
  user_id: string = sessionStorage.getItem('user_id');
  ngOnInit(): void {
    this.getUserDetails();
    this.getTickets();
  }

  getTickets = () => {
    this.apiService
      ._get(`ticket/user?user_id=${this.user_id}`)
      .subscribe((res) => {
        if (res.status) {
          this.tickets = res.body;
        }
      });
  };

  getUserDetails = () => {
    this.apiService._get(`user?id=${this.user_id}`).subscribe((res) => {
      if (res.status) {
        this.userDetails = res.body;
      }
    });
  };

  cancelTicket = (ticket) => {
    if (confirm('Are you sure? Do you want to cancel your ticket')) {
      this.apiService._get(`ticket/cancel/${ticket._id}`).subscribe((res) => {
        if (res.status) {
          this.getTickets();
          this.toastr.success('Selected ticket has been cancelled');
        } else {
          this.toastr.error('Error while cancelling your ticket');
        }
      });
    }
  };
}
