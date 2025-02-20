import {Component, input, output, signal} from '@angular/core';
import {LoaderComponent} from '../../loader/loader.component';
import {Bed} from '../../../model/Bed.type';
import {Booking} from '../../../model/Booking.type';
import {Room} from '../../../model/Room.type';
import {BedsManagementService} from '../../../services/beds-management.service';
import {RoomService} from '../../../services/room.service';
import {FormsModule} from '@angular/forms';
import {FailureHandler} from '../../../services/failureHandler';

@Component({
  selector: 'app-room',
  imports: [
    LoaderComponent,
    FormsModule
  ],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css','../../popUpWidget.css']
})
export class RoomComponent {
  roomId = input<number>(0)
  failMessage = signal<string>("")
  room = signal<Room>({
      name: "",
      id: 0,
      private: false,
      hasTable: false,
      hasBalcony: false,
      hasBin: false,
      hasLocker: false,
      hasPrivateShowerroom: false,
      hasWardrobe: false,
      hasWashtub: false,
    }
  )
  closeEvent = output()

  constructor(private roomService: RoomService, private failureHandler: FailureHandler) {
  }

  async ngOnInit() {
    this.failMessage.set("")
    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
      if (failMessage) {
        this.failMessage.set(failMessage);
      }
    })

    this.roomService.room.subscribe(roomData => {
      if (roomData) {
        this.room.set(roomData);
        console.log(this.room())
      }
    })

    // get bed
    const id = this.roomId()
    await this.roomService.getRoom(id)


  }

  save() {
    this.roomService.updateRoom(this.room())
    this.close()
  }
  delete(){
    this.roomService.deleteRoom(this.room().id)
    this.close()
  }

  close() {
    this.closeEvent.emit()
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
