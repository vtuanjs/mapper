export interface ICustomerCompany {
  name: string;
  website: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  company: IUserCompany;

  tag: string | null;
}

export interface IUserCompany {
  name: string;
  website: string;
}

export interface IUser {
  name: string;
  email: string;
  mobile: string;

  companies: IUserCompany[];
  tag: string | null;
}
