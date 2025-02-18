import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../../services/failureHandler';
import {CreationService} from '../../../services/creation.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Bed} from '../../../model/Bed.type';
import {Room} from '../../../model/Room.type';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-bed',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './bed.component.html',
  styleUrl: './bed.component.css'
})
export class BedComponent {
  failMessage = signal<string>("")
  bed = signal<Bed>({
      id: 0,
      occupied: false,
      number: "",
      sittingApart: false,
      state: " ",
      cleanedBy: null,
      inspectedBy: null,
      doubleBed: false,
      bedShape: "singleBed",
      hasLamp: false,
      hasLittleStorage: false,
      hasShelf: false,
      currentBooking: null,
      reservable: true,
    }
  )
  rooms = signal<Array<Room>>([])

  constructor(private failureHandler: FailureHandler, private roomService: RoomService, private creationService: CreationService) {
  }

  async ngOnInit() {

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
    console.log(this.bed())
    if (this.bed().number.replaceAll(" ",'') == ""){
      this.failMessage.set("Please enter a valid name");
      return;
    }
    if (!this.bed().roomId){
      this.failMessage.set("Please select a room");
      return;
    }
    if (this.bed().state == " "){
      this.failMessage.set("Please select state");
      return;
    }
    await this.creationService.newBed(this.bed())

  }

}
