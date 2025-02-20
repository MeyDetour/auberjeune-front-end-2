import {Component, signal} from '@angular/core';
import {UserService} from '../../services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent {

  constructor(private userService: UserService) {

  }

}
