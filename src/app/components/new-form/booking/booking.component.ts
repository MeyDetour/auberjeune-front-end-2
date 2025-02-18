import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../../services/failureHandler';
import {CreationService} from '../../../services/creation.service';
import {FormsModule} from "@angular/forms";
import {Booking} from '../../../model/Booking.type';
import moment from 'moment';
import {DateService} from '../../../services/date.service';
import {Client} from '../../../model/Client';

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
  mainClient = signal<Client>({firstName: 'John', lastName: 'Doe', birthDate: '2005-10-27'});
  clientsList = signal<Client[]>([])

  constructor(private dateTransformer: DateService, private failureHandler: FailureHandler, private creationService: CreationService) {
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
    // final data
    let formatedData = structuredClone(this.newBooking());
formatedData.clients= []

    // verify data of booking
    let formatedStartDate: any = this.dateTransformer.formatDate(this.newBooking().startDate,"datetime")
    let formatedEndDate: any = this.dateTransformer.formatDate(this.newBooking().endDate,"datetime")
    if (!formatedStartDate || !formatedEndDate) {
      this.failMessage.set("Please enter valid start date and end date");
      return;
    }
    // must add to formated data
    formatedData.startDate = formatedStartDate
    formatedData.endDate = formatedEndDate


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
    let firstname = this.mainClient().firstName.replaceAll(" ", "")
    let lastName = this.mainClient().lastName.replaceAll(" ", "")
    let birthDate: any = this.dateTransformer.formatDate(this.mainClient().birthDate,"date")
    if (firstname == '' || lastName == '' || !birthDate) {
      this.failMessage.set("Please complete first name, last name and birthdate for the main client : "+firstname+" "+lastName+ " "+birthDate)
    return
    }
    formatedData.mainClient = {firstName: firstname, lastName: lastName, birthDate: birthDate};

    // verify data for each client of client list
    this.clientsList().forEach((client: Client) => {
      let firstname = client.firstName.replaceAll(" ", "")
      let lastName = client.lastName.replaceAll(" ", "")
      let birthDate: any = this.dateTransformer.formatDate(client.birthDate,"date")
      if (firstname == '' || lastName == '' || !birthDate) {
        this.failMessage.set("Please complete first name, last name and birthdate for client")
    return;
      }
      formatedData.clients.push( {firstName: firstname, lastName: lastName, birthDate: birthDate})
    })

 await this.creationService.newBooking(formatedData)
  }

}
