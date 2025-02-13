export type Bed = {
  id:number,
  occupied:boolean,
  number :string,
  sittingApart: boolean,
  state: string,
  cleanedBy: null,
  inspectedBy: null,
  doubleBed: boolean,
  bedShape: string,
  hasLamp: boolean,
  hasLittleStorage: boolean,
  hasShelf: boolean,
  reservable:boolean,
  currentBooking: null
  roomId?:number,
}
