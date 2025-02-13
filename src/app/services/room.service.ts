import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Booking} from '../model/Booking.type';
import {HttpClient} from '@angular/common/http';
import {env} from '../environment/environment';
import {Room} from '../model/Room.type';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSource = new BehaviorSubject<Array<Room>>([]);
  room$ = this.roomSource.asObservable();

  private url = env.apiUrl
  constructor(private http: HttpClient) {}

  async getRooms(){
    return this.http.get<Array<Room>>(this.url+"api/rooms/names").subscribe(response => {
      this.roomSource.next(response)
    })
  }
}
