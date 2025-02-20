import {Injectable, InputSignal} from '@angular/core';
import {env} from '../environment/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Room} from '../model/Room.type';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {Bed} from '../model/Bed.type';
import {Booking} from '../model/Booking.type';

@Injectable({
  providedIn: 'root'
})
export class BedsManagementService {
  private baseUrl: string = env.apiUrl;

  private roomsAndBedsStateSource = new BehaviorSubject<Array<Room>>([]);
  roomsAndBeds$ = this.roomsAndBedsStateSource.asObservable();


  private roomsAndBedsForDateStateSource = new BehaviorSubject<Array<Room>>([]);
  roomsAndBedsForDate$ = this.roomsAndBedsForDateStateSource.asObservable();


  private bedSource = new BehaviorSubject<Bed>({
    id: 0,
    occupied: false,
    number: "default",
    sittingApart: false,
    state: " ",
    cleanedBy: null,
    inspectedBy: null,
    doubleBed: false,
    bedShape: " ",
    hasLamp: false,
    hasLittleStorage: false,
    hasShelf: false,
    currentBooking: null,
    reservable: false,
  });
  bed$ = this.bedSource.asObservable();

  private bookingOfBedSource = new BehaviorSubject<Array<Booking>>([]);
  bookingOfBed$ = this.bookingOfBedSource.asObservable();


  constructor(private http: HttpClient) {
  }


  async getBed(id: number) {
    return this.http.get<any>(`${this.baseUrl}api/bed/get/${id}`).subscribe(
      response => {
        console.log(response);
        if (response.bed && response.bookings) {
          this.bedSource.next(response.bed as Bed);
          this.bookingOfBedSource.next(response.bookings as Array<Booking>);
        }
      }
    )
  }

  async updateBed(bed: Bed) {

    console.log("the bed",bed)
    return this.http.put<any>(`${this.baseUrl}api/bed/edit/${bed.id}`, bed).subscribe(
      response => {

        console.log("sucessfully edited")
        this.getRoomsAndBedState()
      }
    )
  }

  async getRoomsAndBedState() {
    return this.http.get<Array<Room>>(this.baseUrl + "api/rooms").subscribe(response => {
        this.roomsAndBedsStateSource.next(response);

      }
    )
  }
  async getRoomsAndBedStateAtDate(date:string) {
    return this.http.get<Array<Room>>(this.baseUrl + "api/rooms/beds?date="+date).subscribe(response => {
    this.roomsAndBedsForDateStateSource.next(response);
    }
    )
  }

  async changeOccupation(id: number) {
    return this.http.patch<Array<Room>>(this.baseUrl + `api/bed/${id}/change/occupation`, {}).subscribe(async response => {
        console.log(response);
        await this.getRoomsAndBedState()
      }
    )
  }
}
