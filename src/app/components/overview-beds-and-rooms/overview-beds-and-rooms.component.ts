import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../services/failureHandler';
import {CreationService} from '../../services/creation.service';
import {BedComponent} from "../edit-form/bed/bed.component";
import {Room} from '../../model/Room.type';
import {BedsManagementService} from '../../services/beds-management.service';
import {RoomComponent} from '../edit-form/room/room.component';

@Component({
  selector: 'app-overview-beds-and-rooms',
  imports: [
    BedComponent,
    RoomComponent
  ],
  templateUrl: './overview-beds-and-rooms.component.html',
  styleUrls: ['./overview-beds-and-rooms.component.css']
})
export class OverviewBedsAndRoomsComponent {
  roomsAndBeds = signal<Room[]>([]);
  renderEditionForm = signal<boolean>(false)
  bedIdToEdit = 0
  roomIdToEdit = 0

  constructor(private bedManagementService: BedsManagementService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRoomsAndBedState()
    this.bedManagementService.roomsAndBeds$.subscribe(roomsAndBeds => {
      this.roomsAndBeds.set(roomsAndBeds);
      console.log(roomsAndBeds);
    })


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
