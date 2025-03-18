import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class SuccesHandlerService {

  constructor(private router: Router,private toast:ToastService) {
  }


  successFullCreation(message='Action Successfully done',path='/admin/dashboard'){
    this.toast.success(message);
    this.router.navigate([path]);

  }

}
