import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) { }

  userName = '';
  password = '';
  errorMessage = '';

  ngOnInit(): void {

    this.activatedRoute.url.subscribe((data) => {

      console.log(data[0].path);

      if (data[0].path) {
        sessionStorage.clear()
      }

    })

  }


  onSubmit(form: NgForm) {

    this.authenticationService.isAuthenticated(this.userName, this.password).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl('/home/products')
        },
        error: (err) => {
          console.log(err)
          this.errorMessage = 'Please check your credentials!!!'
        }
      }
    )
  }

}
