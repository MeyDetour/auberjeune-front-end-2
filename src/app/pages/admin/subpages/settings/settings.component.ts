import { Component } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
constructor(private userService: UserService, private router: Router) {
}

logout(){
  this.userService.logout();
}

}
