import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User} from '../../../model/User.type';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {FailureHandler} from '../../../services/failureHandler';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  user: User = {
    email: "mey@mey.com",
    password: "meymey",
  }
  failMessage = signal("")

  constructor(private userService: UserService, private failureHandler: FailureHandler , private router: Router) {
  }

  ngOnInit() {

    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
     if (failMessage) {
       this.failMessage.set(failMessage);
     }
    })

    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

  }

  async onSubmit() {

    this.failMessage.set("")
    console.log("data submitted : ", this.user)
    let email = this.user.email.replaceAll("/s", "")
    let password = this.user.password.replaceAll("/s", "")

    if (email == "") {
      this.failMessage.set("You must provide email")
      return;
    }
    if (password == "") {
      this.failMessage.set("You must provide password")
      return;
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
      this.failMessage.set("Invalid email address")
      return;
    }

    await this.userService.login(this.user)

  }

}
