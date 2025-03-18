import {Injectable} from '@angular/core';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDate(date: any,type:string) {
    if (date == "") return null
      date = moment(date);
    if (!date.isValid()) return null
    if (type=="date"){
     return  date.format("DD.MM.YYYY");
    }
    return date.format("DD.MM.YYYY HH:mm");
  }
  verifyDate(date: any,type:string) {
    if (date == "" || !date){
      console.log("date is empty or null")
      return null
    }
    if (type=="datetime"){
      date = moment(date);
    }else{
      date = moment(date, moment.ISO_8601, true);
    }
    if (!date.isValid()) {
      console.log("date is invalid")
      return null
    }

   //  if (type=="date"){
   // return  date.format("DD/MM/YYYY");
   //  }
    return date.format("DD-MM-YYYYTHH:mm");
  }


}
