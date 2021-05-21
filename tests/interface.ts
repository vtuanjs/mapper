export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  company: {
    name: string;
    website: string;
  };
}

export interface IUser {
  name: string;
  email: string;
  mobile: string;

  companies: { name: string; website: string }[];
}
