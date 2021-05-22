export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  company: {
    name: string;
    website: string;
  };

  tag: string | null;
}

export interface IUser {
  name: string;
  email: string;
  mobile: string;

  companies: { name: string; website: string }[];
  tag: string | null;
}
