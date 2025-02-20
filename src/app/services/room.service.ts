import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Booking} from '../model/Booking.type';
import {HttpClient} from '@angular/common/http';
import {env} from '../environment/environment';
import {Room} from '../model/Room.type';
import {BedsManagementService} from './beds-management.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsSource = new BehaviorSubject<Array<Room>>([]);
  room$ = this.roomsSource.asObservable();

  private roomSource = new BehaviorSubject<Room | null>(null);
  room = this.roomSource.asObservable();

  private url = env.apiUrl

  constructor(private http: HttpClient, private bedsAndRoom: BedsManagementService) {
  }

  async getRooms() {
    return this.http.get<Array<Room>>(this.url + "api/rooms/names").subscribe(response => {
      this.roomsSource.next(response)
    })
  }

  async getRoom(id: number) {
    return this.http.get<Room>(this.url + "api/room/" + id).subscribe(response => {
      this.roomSource.next(response)
    })
  }

  async updateRoom(room: Room) {
    return this.http.put<Room>(this.url + "api/room/edit/" + room.id, room).subscribe(response => {
      this.roomSource.next(response)
      this.bedsAndRoom.getRoomsAndBedState()
    })
  }

  async deleteRoom(id: number) {
    return this.http.delete<Room>(this.url + "api/room/remove/" + id).subscribe(response => {
      this.bedsAndRoom.getRoomsAndBedState()
    })
  }
}
