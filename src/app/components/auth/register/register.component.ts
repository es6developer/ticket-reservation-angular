import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm = () => {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
    });
  };

  registerUser = () => {
    if (this.registerForm.valid) {
      this.apiService._post('user/register', this.registerForm.value).subscribe(
        (response) => {
          if (response.status) {
            this.toastr.success(
              'Welcome to ticket reservation portal, Please login'
            );
            this.router.navigateByUrl('auth/login');
          }
        },
        (error) => {
          this.toastr.error('Something went wrong!, Please try again');
        }
      );
    } else {
      this.toastr.warning('register form is invalid');
    }
  };
}
