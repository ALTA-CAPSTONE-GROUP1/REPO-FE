export interface PositionData {
  position: string;
  tag: string;
  action: string;
  value: string;
  label: string;
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

export interface SubmissionData {
  submission_type: [];
  positions: [];
}
// export interface SubmissionData {
//   submission_type: {
//     submission_type_name: string;
//     submission_detail: {
//       submission_value: number;
//       submission_requirement: string;
//     }[];
//   }[];
//   positions: {
//     position_name: string;
//     position_tag: string;
//   }[];
// }

export interface SubmissionDetail {
  submission_type_name: string;
  submission_value: number;
  submission_requirement: string;
}
