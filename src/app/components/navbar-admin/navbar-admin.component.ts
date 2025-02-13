import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  page = input('dashboard')

  ngOnInit() {
    console.log(this.page)
  }
}
