import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../../services/failureHandler';
import {CreationService} from '../../../services/creation.service';

@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  failMessage = signal<string>("")

  constructor (private failureHandler: FailureHandler, private creationService : CreationService) {
  }

  ngOnInit() {

    this.failureHandler.error$.subscribe(failMessage => {
      console.log("detec an error ", failMessage);
      if (failMessage) {
        this.failMessage.set(failMessage);
      }
    })


  }

  async onSubmit() {



  }

}
