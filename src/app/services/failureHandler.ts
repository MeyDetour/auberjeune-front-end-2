import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class FailureHandler {
  private errorSource = new BehaviorSubject<string | null>(null);
  error$ = this.errorSource.asObservable();

  constructor(private toast : ToastService) {
  }


  setError(error: string) {
    this.errorSource.next(error);
    this.toast.error(error);
  }



}
