import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/shared/common.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      let userDetails: IUserDetails = {
        userId: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl
      }
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      this.router.navigateByUrl("/patient-registration");
    });
  }

  onSignInSuccess(user: any): void {
    console.log('Google login success', user);
    // Handle session, store user, etc.
  }
  
  continueWithoutLogin(){
    let commonUser: IUserDetails = {
      userId: undefined
    }
    localStorage.setItem("userDetails", JSON.stringify(commonUser))
    this.router.navigateByUrl("/patient-registration");
  }

  onSignInError(error: any): void {
    console.error('Google login error', error);
  }
}
