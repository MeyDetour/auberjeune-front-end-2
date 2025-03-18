import {Component, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoaderComponent} from "../../loader/loader.component";
import {Booking} from '../../../model/Booking.type';
import {Client} from '../../../model/Client';
import {BookingService} from '../../../services/booking.service';
import {FailureHandler} from '../../../services/failureHandler';
import {DateService} from '../../../services/date.service';
@Component({
  selector: 'app-booking',
  imports: [
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css', '../../popUpWidget.css']
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
      clients: []
    }
  )
  mainClient = signal<Client>({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthDateBaseFormat: "",
  })
  clientsList = signal<Client[]>([])


  failMessage = signal<string>("")

  closeEvent = output()

  constructor(private bookingService: BookingService, private dateTransformer: DateService, private failureHandler: FailureHandler) {
  }

  async ngOnInit() {
    this.bookingService.booking$.subscribe(booking => {
      if (booking) {
        this.booking.set(booking)
        console.log("bookin to edit :",booking)
        if (booking.mainClient) {
          this.mainClient.set(booking.mainClient);
        }
        console.log(this.booking);
      }
    })

    this.failMessage.set("")
    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
      if (failMessage) {
        this.failMessage.set(failMessage);
      }
    })

    this.bookingService.getBookingWithId(this.bookingID())

  }

  addClientToClientList() {
    this.clientsList.set([...this.clientsList(), {firstName: '', lastName: '', birthDate: ''}]);
  }

  close() {
    this.closeEvent.emit()
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  cancelBooking() {
  }

  async save() {
    console.log(this.booking);

    // final data
    let formatedData = structuredClone(this.booking());
    formatedData.clients = []
    // verify data of booking
    let formatedStartDate: any = this.dateTransformer.verifyDate(this.booking().startDate, "datetime")
    let formatedEndDate: any = this.dateTransformer.verifyDate(this.booking().endDate, "datetime")
    if (!formatedStartDate || !formatedEndDate) {
      this.failMessage.set("Please enter valid start date and end date");
      return;
    }


    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(this.booking().mail)) {
      this.failMessage.set("Invalid email address")
      return;
    }
    // already in final data

    if (this.booking().phoneNumber == '') {
      this.failMessage.set("Invalid phone number")
      return;
    }
    // already in final data

    // verify data for the main client
    let firstname = this.mainClient().firstName.replaceAll(" ", "")
    let lastName = this.mainClient().lastName.replaceAll(" ", "")
    let birthDate: any = this.dateTransformer.verifyDate(this.mainClient().birthDate, "date")
    if (firstname == '' || lastName == '' || !birthDate) {
      this.failMessage.set("Please complete first name, last name and birthdate for the main client : " + firstname + " " + lastName + " " + birthDate)
      return
    }
    formatedData.mainClient = {firstName: firstname, lastName: lastName, birthDate: this.mainClient().birthDate};

    // verify data for each client of client list
    this.clientsList().forEach((client: Client) => {
      let firstname = client.firstName.replaceAll(" ", "")
      let lastName = client.lastName.replaceAll(" ", "")
      let birthDate: any = this.dateTransformer.verifyDate(client.birthDate, "date")
      if (firstname == '' || lastName == '' || !birthDate) {
        this.failMessage.set("Please complete first name, last name and birthdate for client")
        return;
      }
      formatedData.clients.push({firstName: firstname, lastName: lastName, birthDate: client.birthDate})
    })
    console.log(formatedData)
    await this.bookingService.updateBooking(formatedData)
    this.close()
  }
}
