import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Room} from '../model/Room.type';
import {HttpClient} from '@angular/common/http';
import {Bed} from '../model/Bed.type';
import {env} from '../environment/environment';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class CreationService {
  private formToRenderSource = new BehaviorSubject<string>("booking");
  formToRender$ = this.formToRenderSource.asObservable();

  private url = env.apiUrl

  constructor(private http: HttpClient,private router: Router,private toast:ToastService) {
  }

  setFormToRender(name: string): void {
    this.formToRenderSource.next(name);
  }

  successFullCreation(){
    this.toast.success("Created Successfully");
    this.router.navigate(['/admin/dashboard']);

  }

  async newBed(bed: Bed) {
    return this.http.post<Room>(this.url + 'api/bed/new', bed).subscribe(response => {
      console.log(response);
     this.successFullCreation();
    })
  }

  async newRoom(room: Room) {
    this.http.post<Room>(this.url + 'api/room/new', room).subscribe(response => {
      console.log(response);
      this.successFullCreation();
   })
  }
}
