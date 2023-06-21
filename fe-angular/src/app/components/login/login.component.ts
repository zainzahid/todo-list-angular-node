import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(loginForm: NgForm): void {
    if(!loginForm.form.valid) {
      return
    }
    this.authService.login(this.email, this.password).subscribe(
      () => {
        // Redirect to todo list page after successful login
        this.router.navigate(['/list']);
      },
      () => {
        // Display error message in case of login failure
        this.loginError = true;
      }
    );
  }
}
