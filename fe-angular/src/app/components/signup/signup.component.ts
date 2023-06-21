import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string;
  password: string;
  signupError: boolean = false;

  constructor(private authService: AuthService,  private router: Router) {}

  signup(signupForm: NgForm): void {
    if(!signupForm.form.valid) {
      return
    }
    this.authService.signup(this.email, this.password).subscribe(() => {
      // Logout and Redirect to login page after successful signup
      this.authService.logout();
      this.router.navigate(['/login']);
    },
    () => {
      // Display error message in case of login failure
      this.signupError = true;
    });
  }
}
