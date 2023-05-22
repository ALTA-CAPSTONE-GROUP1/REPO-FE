interface ApproveDetailType {
  submission_id?: number;
  from?: {
    name?: string;
    position?: string;
  };
  to?: {
    name?: string;
    position?: string;
  }[];
  cc?: {
    position?: string;
    name?: string;
  }[];
  submission_type?: string;
  title?: string;
  message?: string;
  status_by?: {
    status?: string;
    by?: string;
  }[];
  attachment?: string;
}

export default ApproveDetailType;
