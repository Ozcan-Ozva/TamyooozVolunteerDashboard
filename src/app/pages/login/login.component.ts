import { API } from './../../services/api.service';
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  ngOnDestroy() {}

  public onPasswordSubmit() {
    this._onLogin(this.email, this.password)
      .then((data) => {
        console.log(data);
        API.token$.next(data.data.admin.access_token);
        setTimeout(() => {
          this.router.navigate([""])
          .then(() => {
            //window.location.reload();
          })
        }, 0);
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) alert("Wrong Password");
        }
      });
  }

  private async _onLogin(email: string, password: string) {
    console.log("this is email");
    console.log(this.email);
    console.log("this is password");
    console.log(this.password);
    return this.authService.signIn(this.email, this.password);
  }
}
