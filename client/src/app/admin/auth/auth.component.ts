import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../model/auth.service';

import { User } from '../../model/user.model';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit
{
  public user: User;
  public errorMessage: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  authenticate(form: NgForm): void
  {
    console.log("authenticate")
    if (form.valid)
    {
      // perform authentication
      this.auth.authenticate(this.user).subscribe(data => {
        if (data.success)
        {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigateByUrl('surveylist');
        }
      });
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }

}
