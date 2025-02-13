import {Component, signal} from '@angular/core';
import {FailureHandler} from '../../services/failureHandler';
import {CreationService} from '../../services/creation.service';

@Component({
  selector: 'app-overview-beds-and-rooms',
  imports: [],
  templateUrl: './overview-beds-and-rooms.component.html',
  styleUrl: './overview-beds-and-rooms.component.css'
})
export class OverviewBedsAndRoomsComponent {
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
