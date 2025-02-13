import {Component, EventEmitter, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Bed} from '../../../model/Bed.type';
import {BedsManagementService} from '../../../services/beds-management.service';
import {LoaderComponent} from '../../loader/loader.component';
import {Booking} from '../../../model/Booking.type';
import {Room} from '../../../model/Room.type';
import {RoomService} from '../../../services/room.service';

@Component({
  selector: 'app-bed',
  imports: [
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './bed.component.html',
  styleUrl: './bed.component.css'
})
export class BedComponent {
  bedId = input<number>(0)
  bed = signal<Bed>({
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
      reservable: true,
    }
  )
  bookings = signal<Array<Booking>>([])
  rooms = signal<Array<Room>>([])
  closeEvent = output()

  constructor(private bedService: BedsManagementService, private roomService: RoomService) {
  }

  async ngOnInit() {
    console.log(this.bedId())
    this.bedService.bed$.subscribe(bedData => {
      this.bed.set(bedData);
    })
    this.bedService.bookingOfBed$.subscribe(bookingsData => {
      this.bookings.set(bookingsData);
    })
    this.roomService.room$.subscribe(roomsData => {
      this.rooms.set(roomsData);
    })

    // get bed
    const id = this.bedId()
    await this.bedService.getBed(id)

    // get room
    await this.roomService.getRooms()
  }


  close() {
    this.closeEvent.emit()
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }


  async save() {
    console.log(this.bed)
    console.log(this.bed())
    await this.bedService.updateBed(this.bed())
    this.close()
  }
}
