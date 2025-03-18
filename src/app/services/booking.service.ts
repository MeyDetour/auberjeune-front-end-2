import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {env} from '../environment/environment';
import {Filling} from '../model/Filling.type';
import {Booking} from '../model/Booking.type';
import {SuccesHandlerService} from './succes-handler.service';
import {DateService} from './date.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private fillingStateSource = new BehaviorSubject<Filling>({
    clientsToCome: 0,
    clientsDeparture: 0,
    globalFillingPercentage: 0,
    privateRoomFillingPercentage: 0,
    morningFillingPercentage: 0,
    nightFillingPercentage: 0
  });
  filling$ = this.fillingStateSource.asObservable();

  private bookingsSource = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSource.asObservable();

  private bookingSource = new BehaviorSubject<Booking | null>(null);
  booking$ = this.bookingSource.asObservable();


  private url = env.apiUrl

  constructor(private http: HttpClient, private successHandler: SuccesHandlerService, private dateService: DateService) {
  }



  setBookings(bookings: Booking[]) {
    console.log(bookings);
    let bookingsFormated = []
    for (let booking of bookings) {
      let formatedBooking = this.formatBookikng(booking)
      if (formatedBooking) {
        bookingsFormated.push(formatedBooking)
      }
    }
    console.log(bookingsFormated)
    this.bookingsSource.next(bookingsFormated);
  }

  setBooking(booking: Booking) {
    let formatedBooking = this.formatBookikng(booking)
    if (formatedBooking) {
      this.bookingSource.next(formatedBooking);
    } else {
      this.bookingSource.next(null);
    }
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  formatBookikng(booking: Booking) {
    console.log(booking);
    if (this.dateService.verifyDate(booking.startDate, 'datetime')) {
      booking.startDateBaseFormat = booking.startDate;
      booking.startDate = this.dateService.formatDate(booking.startDate, 'datetime')
    }

    console.log(booking);

    if (this.dateService.verifyDate(booking.endDate, 'datetime')) {
      booking.endDateDateBaseFormat = booking.endDate;
      booking.endDate = this.dateService.formatDate(booking.endDate, "datetime")
    }
    console.log(booking);

    if (!booking.startDate || !booking.endDate) {
      return null
    }
    console.log(booking);


    if (booking.mainClient) {
      let date = this.dateService.verifyDate(booking.mainClient?.birthDate, 'date')
      if (date) {
        booking.mainClient.firstName = this.capitalize(booking.mainClient.firstName)
        booking.mainClient.lastName = this.capitalize(booking.mainClient.lastName)
        booking.mainClient.birthDateBaseFormat = date;
        booking.mainClient.birthDate = this.dateService.formatDate(booking.mainClient.birthDate, "date")
      } else {
        return null
      }
    }
    if (booking.clients) {
      for (let client of booking.clients) {

        client.firstName = this.capitalize(client.firstName)
        client.lastName = this.capitalize(client.lastName)
        if (this.dateService.verifyDate(client.birthDate, 'date')) {
          client.birthDateBaseFormat = client.birthDate;
          client.birthDate = this.dateService.formatDate(client.birthDate, "date")
        } else {
          return null
        }
      }
    }

    console.log(booking);

    return booking;

  }


  setFillingStateSource(fillingStateSource: Filling) {
    this.fillingStateSource.next(fillingStateSource);
  }


  newBooking(booking: Booking) {
    return this.http.post(this.url + 'api/booking/new', booking).subscribe(response => {
      console.log(response);
      this.successHandler.successFullCreation();
    })
  }

  getFillingState() {
    return this.http.get<Filling>(this.url + "api/bookings/state").subscribe(
      response => {
        console.log(response);
        this.setFillingStateSource(response);
      }
    )
  }

  getBookingWithId(id: number) {
    return this.http.get<Booking>(this.url + "api/booking/" + id).subscribe(
      response => {
        console.log(response);
        this.setBooking(response);
      }
    )
  }

  updateBooking(booking: Booking) {
    return this.http.put<Booking>(this.url + "api/booking/edit", booking).subscribe(
      response => {
        console.log(response);
        this.successHandler.successFullCreation("Booking has been updated");
      }
    )
  }

  getBookingsWithConditions(field: string) {
    return this.http.get<Booking[]>(this.url + "api/bookings/get/" + field).subscribe(
      response => {
        console.log(response)
        this.setBookings(response);
      }
    )
  }
}

