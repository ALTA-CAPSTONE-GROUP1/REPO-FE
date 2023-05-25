export interface PositionData {
  position_id: number;
  position: string;
  tag: string;
  action: string;
  value: string;
  label: string;
}
export interface OfficeData {
  ID: number;
  Name: string;
}

export interface UserData {
  user_id: string;
  name: string;
  email: string;
  position: string;
  office: string;
  hp: string;
  action: string;
}
export interface UserDataUpdate extends UserData {
  phone_number: string;
  password: string;
}
export interface ApprovingData {
  submission_id: string;
  token: string;
}

export interface SubmissionDetail {
  submission_type_name: string;
  submission_value: number;
  submission_requirement: string;
}

export interface Meta {
  current_limit: number;
  current_offset: number;
  current_page: number;
  total_data: number;
  total_page: number;
}

export interface HyperApproval {
  submission_type?: string;
  submission_title?: string;
  message_body?: string;
  approver_action?: {
    action?: string;
    approver_name?: string;
    approver_position: string;
  }[];
}
