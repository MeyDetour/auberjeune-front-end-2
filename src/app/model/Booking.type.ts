import {Client} from './Client';

export type Booking = {
  id: number,
  startDate: string,
  endDate: string,
  startDateBaseFormat?: string,
  endDateDateBaseFormat?: string,
  phoneNumber: string,
  mail: string,
  clientsNumber?: number,
  finished?: boolean,
  advencement?: string,
  mainClient?: Client,
  clients:Array<Client>,
  wantPrivateRoom?: boolean,
}
