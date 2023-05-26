interface approveTypes {
  submission_id: number;
  from: {
    name: string;
    position: string;
  };
  title: string;
  submission_type: string;
  status: string;
  receive_date: string;
  opened: boolean;
}

export default approveTypes;
