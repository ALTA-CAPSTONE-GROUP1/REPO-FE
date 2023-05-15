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
  hp: string;
}
export interface UserDataUpdate extends UserData {
  password: string;
}
export interface ApprovingData {
  submission_id: string;
  token: string;
}
