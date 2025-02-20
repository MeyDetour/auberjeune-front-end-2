import {Component, effect, signal} from '@angular/core';
import {FailureHandler} from '../../services/failureHandler';
import {CreationService} from '../../services/creation.service';
import {BedComponent} from "../edit-form/bed/bed.component";
import {Room} from '../../model/Room.type';
import {BedsManagementService} from '../../services/beds-management.service';
import {RoomComponent} from '../edit-form/room/room.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-overview-beds-and-rooms',
  imports: [
    BedComponent,
    RoomComponent,
    FormsModule
  ],
  templateUrl: './overview-beds-and-rooms.component.html',
  styleUrls: ['./overview-beds-and-rooms.component.css']
})
export class OverviewBedsAndRoomsComponent {
  roomsAndBeds = signal<Room[]>([]);
  roomsAndBedsForDate = signal<Room[]>([]);
  roomsAndBedsOriginalData = signal<Room[]>([]);
  renderEditionForm = signal<boolean>(false)
  bedIdToEdit = 0
  roomIdToEdit = 0


  constructor(private bedManagementService: BedsManagementService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getRoomsAndBedState()
    this.bedManagementService.roomsAndBeds$.subscribe(roomsAndBeds => {
      this.roomsAndBeds.set(roomsAndBeds);
      this.roomsAndBedsOriginalData.set(roomsAndBeds);
      console.log(roomsAndBeds);
    })
    this.bedManagementService.roomsAndBedsForDate$.subscribe(roomsAndBeds => {
      this.roomsAndBeds.set(roomsAndBeds);
      console.log(roomsAndBeds);
    })
  }

  //  BED FILTER
  changeOccupation(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue);
    this.restoreOriginalRoomsAndBedState()

    if (selectedValue == 'free') {
      this.getBedsFree()
      this.removeEmptyRoom()
    }

    if (selectedValue == 'occupied') {
      this.getBedsOccupied()
      this.removeEmptyRoom()
    }
    return

  }

  getBedsOccupied() {
    this.roomsAndBeds.update(rooms =>
      rooms.map(room => ({
          ...room,
          beds: room.beds?.filter(bed => bed.occupied)
        })
      )
    )
  }

  getBedsFree() {
    this.roomsAndBeds.update(rooms =>
      rooms.map(room => ({
          ...room,
          beds: room.beds?.filter(bed => !bed.occupied)
        })
      )
    )
  }

  removeEmptyRoom() {
    this.roomsAndBeds.update(rooms =>
      rooms.filter(room => Array.isArray(room.beds) && room.beds.length > 0))
  }


  // Room filter
  changeRoom(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.restoreOriginalRoomsAndBedState()

    if (selectedValue == 'private') {
      this.getPrivateRooms()
    }
    if (selectedValue == 'public') {
      this.getPublicRooms()
    }
    return
  }

  getPublicRooms() {
    this.roomsAndBeds.update(rooms => {
      return rooms.filter(room => !room.private)
    })
  }

  getPrivateRooms() {
    this.roomsAndBeds.update(rooms =>
      rooms.filter(room => room.private)
    )
  }


  // taken at date
  async changeTakenAtDate(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log(selectedValue)
   await this.bedManagementService.getRoomsAndBedStateAtDate(selectedValue);

  }



  restoreOriginalRoomsAndBedState() {
    this.roomsAndBeds.set(this.roomsAndBedsOriginalData())
  }

  async getRoomsAndBedState() {
    await this.bedManagementService.getRoomsAndBedState();
  }

  editBed(id: number) {
    this.bedIdToEdit = id;
    this.renderEditionForm.set(true)
  }

  editRoom(id: number) {

    this.roomIdToEdit = id;
    this.renderEditionForm.set(true)
  }

  async closeEdition() {
    this.bedIdToEdit = 0;
    this.roomIdToEdit = 0;
    this.renderEditionForm.set(false)
  }

}
