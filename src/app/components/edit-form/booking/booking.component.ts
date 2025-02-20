import {Component, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoaderComponent} from "../../loader/loader.component";
import {Bed} from '../../../model/Bed.type';
import {Booking} from '../../../model/Booking.type';
import {Room} from '../../../model/Room.type';
import {BedsManagementService} from '../../../services/beds-management.service';
import {RoomService} from '../../../services/room.service';
import {Client} from '../../../model/Client';
import {BookingService} from '../../../services/booking.service';
import {FailureHandler} from '../../../services/failureHandler';

@Component({
  selector: 'app-booking',
    imports: [
        FormsModule,
        LoaderComponent
    ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css','../../popUpWidget.css' ]
})
export class BookingComponent {

  bookingID = input<number>(0)
  booking = signal<Booking>({
    id: 0,
    startDate: "",
    endDate: "",
    phoneNumber: "",
    mail: "",
    finished: false,
    advencement: "",
    wantPrivateRoom: false,
    clients:[]
    }
  )

  failMessage = signal<string>("")
  clients = signal<Array<Client>>([])
  mainClient = signal<Client>({
    firstName:"",
    lastName:"",
    birthDate:"",
  })
  closeEvent = output()

  constructor(private bookingService: BookingService, private roomService: RoomService,private failureHandler: FailureHandler) {
  }

  async ngOnInit() {
this.bookingService.booking$.subscribe(booking => {
  if (booking) {
    this.booking.set(booking)
  }this.failMessage.set("")
  this.failureHandler.error$.subscribe(failMessage => {
    console.log("detec an error ", failMessage);
    if (failMessage) {
      this.failMessage.set(failMessage);
    }
  })

  this.bookingService.getBookingWithId(this.bookingID())
})
  }

  addClientToClientList() {
    this.clients.set([...this.clients(), {firstName: '', lastName: '', birthDate: ''}]);
  }

  close() {
    this.closeEvent.emit()
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

cancelBooking() {}
  async save() {
    this.bookingService.updateBooking(this.booking())
    this.close()
  }
}
