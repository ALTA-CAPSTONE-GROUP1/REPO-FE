export interface PositionData {
  position: string;
  tag: string;
  action: string;
}
export interface OfficeData {
  office_name: string;
}
export interface UserData {
  user_id: string;
  name: string;
  email: string;
  position: string;
  office: string;
}
export interface UserDataUpdate extends UserData {
  hp: string;
  password: string;
}
