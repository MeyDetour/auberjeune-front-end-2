export type Room = {
  beds?: Array<{id:number,number:string,occupied:boolean}>,
  bedsNumber: number,
  hasBalcony :   boolean,
  hasBin:boolean,
  hasLocker : boolean,
  hasPrivateShowerroom :boolean,
  hasTable:boolean,
  hasWardrobe:boolean,
  hasWashtub:boolean,
  id:number
  private:boolean,
  name:string,
}
