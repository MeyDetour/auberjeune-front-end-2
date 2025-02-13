import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {env} from '../environment/environment';
import {Filling} from '../model/Filling.type';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private fillingStateSource = new BehaviorSubject<Filling>({
    clientsToCome: 0,
    clientsDeparture: 0,
    globalFillingPercentage: 0,
    privateRoomFillingPercentage: 0,
    morningFillingPercentage: 0,
    nightFillingPercentage: 0
  });
  filling$ = this.fillingStateSource.asObservable();

  private url = env.apiUrl

  constructor(private http: HttpClient) {
  }


  setFillingStateSource(fillingStateSource: Filling) {
    this.fillingStateSource.next(fillingStateSource);
  }


  getFillingStateSource() {
    return this.http.get<Filling>(this.url + "api/bookings/state").subscribe(
      response => {
        console.log(response);
      }
    )
  }

}

