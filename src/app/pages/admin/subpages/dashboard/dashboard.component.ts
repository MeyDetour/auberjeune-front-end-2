import {Component, signal} from '@angular/core';
import {FillingComponent} from "../../../../components/widget/filling/filling.component";
import {BookingService} from '../../../../services/booking.service';
import {Booking} from '../../../../model/Booking.type';
import {BookingComponent} from '../../../../components/edit-form/booking/booking.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FillingComponent,
    BookingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  section = signal<string>("tocome")
  bookings = signal<Booking[]>([])
  bookingId = signal<number>(0)
renderForm= signal<boolean>(false)
  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.bookingService.bookings$.subscribe(bookings => {
      this.bookings.set(bookings)
    })
    this.changeSection(this.section())
  }

  changeSection(value: string) {
    this.section.set(value)
    this.bookingService.getBookingsWithConditions(value)
  }

  renderFormForBooking(bookingId: number) {
    this.bookingId.set(bookingId)
    this.renderForm.set(true)
  }

  async closeEdition() {
    this.bookingId.set(0)
    this.renderForm.set(false)


  }
}
