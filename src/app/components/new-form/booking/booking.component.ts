import {Component, output, signal} from '@angular/core';
import {FailureHandler} from '../../../services/failureHandler';
import {FormsModule} from "@angular/forms";
import {Booking} from '../../../model/Booking.type';
import {DateService} from '../../../services/date.service';
import {Client} from '../../../model/Client';
import {BookingService} from '../../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [
    FormsModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  failMessage = signal<string>("")
  newBooking = signal<Booking>({
    id: 0,
    startDate: "2025-07-25T00:00",
    endDate: "2025-07-27T14:00",
    phoneNumber: "041541545",
    mail: "test@gmail.com",
    finished: false,
    advencement: " ",
    wantPrivateRoom: false,
    clients: []
  })
  mainClient = signal<Client>({firstName: 'John', lastName: 'Doe', birthDate: ""});
  clientsList = signal<Client[]>([])

  constructor(private bookingService: BookingService, private dateTransformer: DateService, private failureHandler: FailureHandler) {
  }

  ngOnInit() {
    this.failMessage.set("")
    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
      if (failMessage) {
        this.failMessage.set(failMessage);
      }
    })


  }

  addClientToClientList() {
    this.clientsList.set([...this.clientsList(), {firstName: '', lastName: '', birthDate: ''}]);
  }

  async onSubmit() {

    console.log(this.newBooking());
    console.log(this.mainClient());

    // final data
    let formatedData = structuredClone(this.newBooking());
    formatedData.clients = []
    // verify data of booking
    let formatedStartDate: any = this.dateTransformer.verifyDate(this.newBooking().startDate, "datetime")
    let formatedEndDate: any = this.dateTransformer.verifyDate(this.newBooking().endDate, "datetime")
    if (!formatedStartDate || !formatedEndDate) {
      this.failMessage.set("Please enter valid start date and end date");
      return;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(this.newBooking().mail)) {
      this.failMessage.set("Invalid email address")
      return;
    }
    // already in final data

    if (this.newBooking().phoneNumber == '') {
      this.failMessage.set("Invalid phone number")
      return;
    }
    // already in final data

    // verify data for the main client
    this.mainClient().firstName = this.mainClient().firstName.replaceAll(" ", "")
    this.mainClient().lastName = this.mainClient().lastName.replaceAll(" ", "")
    this.mainClient().birthDate = this.dateTransformer.verifyDate(this.mainClient().birthDate, "date")

    if (this.mainClient().firstName == '' || this.mainClient().lastName == '') {
      this.failMessage.set("Please complete first name and last name  for the main client")
      return
    }
    if (!this.mainClient().birthDate) {
      this.failMessage.set("Please enter a valid birthdate for the main client")
      return
    }
     formatedData.mainClient = this.mainClient();


    // verify data for each client of client list
    this.clientsList().forEach((client: Client) => {
      client.firstName = client.firstName.replaceAll(" ", "")
      client.lastName = client.lastName.replaceAll(" ", "")
      client.birthDate = this.dateTransformer.verifyDate(client.birthDate, "date")
      if (!client.firstName || !client.lastName) {
        this.failMessage.set("Please complete first name, last name for client")
        return;
      }
      if (!client.birthDate) {
        this.failMessage.set("Please entre valid birthdate for client")
        return;
      }

      formatedData.clients.push(client)
    })

    console.log(this.newBooking());
    console.log(this.mainClient());

    console.log("data to send :",formatedData)
    await this.bookingService.newBooking(formatedData)
  }

}
