export interface oneMiData {
  miName: {
    name: string;
    hira: string;
  };
  oriId_m: string;
  email: string;
  location: {
    zip_m: string;
    address1_m: string;
    address2_m: string;
  };
  contact: {
    phone_m: string;
    fax_m: string;
    contactEmail: string;
  };
  businessContact: {
    with: string;
    speaker: string;
    content: string;
    update: number;
    isRead: boolean;
  }[];
  notice_m: [
    {
      title: string;
      update: number;
      content: string;
    }
  ];
  department: string[];
  reservation_m: {
    reservationDate: number;
    update: number;
    oriId_p: string;
    department: string;
    isCome: boolean;
    isInterviewed: boolean;
  }[];
}

export interface oneMiType extends oneMiData {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface oneStaffDataType {
  message: {
    content: string;
    update: number;
  };
  miAffiliation: {
    role: string[];
    oriId_m: string;
  }[];
  navListSave: string[];
  oriId_s: string;
  lastLogin: number;
  isLogin: boolean;
  staffName: {
    name: string;
    hira: string;
  };
  workSpace: {
    mi: string;
    space: string;
  };
}

export type staffDataType = oneStaffDataType[];

export type staffType = {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  staff: oneStaffDataType[];
};

export interface oneStaffType extends oneStaffDataType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
