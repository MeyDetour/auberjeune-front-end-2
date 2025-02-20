import {Injectable} from '@angular/core';
import moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDate(date: any,type:string) {
    if (date == "") return null
    if (type=="datetime"){
      date = moment(date);
    }else{
      date = moment(date, moment.ISO_8601, true);
    }
    if (!date.isValid()) return null
    return date.format("DD.MM.YYYY HH:mm");
  }
}
