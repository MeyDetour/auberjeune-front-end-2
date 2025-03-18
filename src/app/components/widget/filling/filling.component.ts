import {Component, signal} from '@angular/core';
import {BookingService} from '../../../services/booking.service';
import {NgStyle} from '@angular/common';
import {Filling} from '../../../model/Filling.type';

@Component({
  selector: 'app-filling',
  imports: [
    NgStyle
  ],
  templateUrl: './filling.component.html',
  styleUrl: './filling.component.css'
})


export class FillingComponent {
  filling = signal<Filling>({
    clientsToCome: 0,
    clientsDeparture: 0,
    globalFillingPercentage: 0,
    privateRoomFillingPercentage: 0,
    morningFillingPercentage: 0,
    nightFillingPercentage: 0
  })

  constructor(private bookingService: BookingService) {
    this.bookingService.filling$.subscribe(filling => {
      this.filling.set(filling);
    })
  }

  async ngOnInit() {
    this.bookingService.filling$.subscribe(fillingData => {
      this.filling.set(fillingData);
    })

    this.bookingService.getFillingState()


  }


  protected readonly parseInt = parseInt;
  protected readonly toString = toString;
}
