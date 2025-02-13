export type User={
  username?:string,
  email:string,
  password:string,
  id?:number,
  firstName?: string,
  lastName?: string,
  website?: string,
  profession?: string,
  phoneNumber?: string,
  roles?:Array<string>
}
