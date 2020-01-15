import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp(signUpData) {
    const reg = () => {
      return this.router.navigate(['/login']);
    };

    this.authService.signUp(signUpData).subscribe({
      next() {
        reg();
      },
      error(msg) {
        console.error(msg);
      }
    });
  }

}
