import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mapping } from '../src';
import { IUser, ICustomer } from './interface';

const customer: ICustomer = {
  firstName: 'Tuan',
  lastName: 'Nguyen',
  email: 'vantuan130393@gmail.com',
  phone: '0333333333',

  company: {
    name: 'COMPANY',
    website: 'company.com'
  }
};

describe('MAPPING CUSTOMER - USER', () => {
  it('should be mapped value from customer object to user object', (done) => {
    const user = mapping<ICustomer, IUser>({
      from: customer,
      mapper: {
        email: 'email',
        mobile: 'phone'
      },
      handle: (from) => {
        return {
          name: `${from.firstName} ${from.lastName}`,
          companies: [{ name: from.company.name, website: from.company.website }]
        };
      }
    });

    expect(user.email).to.be.a('string');
    expect(user.mobile).to.be.a('string');
    expect(user.name).to.be.a('string');
    expect(user.companies).to.be.a('array');
    done();
  });
});
