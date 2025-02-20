import {Component, signal} from '@angular/core';
import {BedsManagementService} from '../../../../services/beds-management.service';
import {Room} from '../../../../model/Room.type';
import {FillingComponent} from '../../../../components/widget/filling/filling.component';
import {Bed} from '../../../../model/Bed.type';
import {BedComponent} from '../../../../components/edit-form/bed/bed.component';

@Component({
  selector: 'app-manage',
  imports: [
    FillingComponent,
    BedComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  roomsAndBeds = signal<Room[]>([]);
  renderEditionForm = signal<boolean>(false)
  bedIdToEdit = 0

  constructor(private bedManagementService: BedsManagementService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRoomsAndBedState()


    this.bedManagementService.roomsAndBeds$.subscribe(roomsAndBeds => {
      this.roomsAndBeds.set(roomsAndBeds);
      console.log(roomsAndBeds);
    })


  }

  async getRoomsAndBedState() {
    await this.bedManagementService.getRoomsAndBedState();
  }

   editBed(id: number) {
    this.bedIdToEdit = id;
    this.renderEditionForm.set(true)
  }
   async closeEdition() {
     this.bedIdToEdit = 0;
     this.renderEditionForm.set(false)


   }

}
