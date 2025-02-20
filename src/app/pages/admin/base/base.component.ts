import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarAdminComponent} from '../../../components/navbar-admin/navbar-admin.component';

import {DashboardComponent} from '../subpages/dashboard/dashboard.component';
import {SettingsComponent} from '../subpages/settings/settings.component';
import {ManageComponent} from '../subpages/manage/manage.component';
import {NewComponent} from '../subpages/new/new.component';

@Component({
  selector: 'app-base',
  imports: [
    NavbarAdminComponent,
    SettingsComponent,
    DashboardComponent,
    DashboardComponent,
    SettingsComponent,
    ManageComponent,
    NewComponent,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  page :string|null = null

  constructor(private routeParam :ActivatedRoute, private router : Router) {
  }
  ngOnInit() {
    this.routeParam.paramMap.subscribe(params => {
      this.page = params.get('page');
      console.log('Page:', this.page);
    });
  }
}
