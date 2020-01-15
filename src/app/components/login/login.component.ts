import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {

    const auth = (res: { token: string }) => {
      localStorage.setItem('jwt', res.token);
      this.router.navigate(['/home']);
    };

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next(res: { token: string }) {
        auth(res);
      },
      error(msg) {
        console.error(msg);
      }
    });
  }

}
