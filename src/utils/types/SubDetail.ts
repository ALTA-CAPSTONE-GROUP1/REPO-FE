interface SubDetailType {
  to?: {
    approver_position?: string;
    approver_name?: string;
  }[];
  cc?: {
    cc_position?: string;
    cc_name?: string;
  }[];
  submission_type?: string;
  title?: string;
  message?: string;
  approver_action?: {
    action?: string;
    approver_name?: string;
    approver_position: string;
  }[];
  action_message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachment?: string;
}

export default SubDetailType;
