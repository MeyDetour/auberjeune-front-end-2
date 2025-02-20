import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../../services/failureHandler';
import {CreationService} from '../../../services/creation.service';
import {FormsModule} from '@angular/forms';
import {Room} from '../../../model/Room.type';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-room',
  imports: [
    FormsModule
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  failMessage = signal<string>("")
  room = signal<Room>({
    name:"",
    id:0,
    private:false,
    hasTable:false,
    hasBalcony :   false,
    hasBin:false,
    hasLocker : false,
    hasPrivateShowerroom :false,
    hasWardrobe:false,
    hasWashtub:false,
    }
  )
  rooms = signal<Array<Room>>([])

  constructor(private failureHandler: FailureHandler, private roomService: RoomService, private creationService: CreationService) {
  }

  async ngOnInit() {

    this.failMessage.set("")
    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
      if (failMessage) {
        this.failMessage.set(failMessage);
      }
    })
    this.roomService.room$.subscribe(roomsData => {
      this.rooms.set(roomsData);
    })

    await this.roomService.getRooms()
  }

  async onSubmit() {
    if (this.room().name.replaceAll(" ","") == ""){
      this.failMessage.set("Please enter a name");
      return
    }
    await this.creationService.newRoom(this.room())

  }


}
