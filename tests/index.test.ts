import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mapping } from '../src';
import { IUser, ICustomer, ICustomerCompany, IUserCompany } from './interface';

const customer: ICustomer = {
  firstName: 'Tuan',
  lastName: 'Nguyen',
  email: 'vantuan130393@gmail.com',
  phone: '0333333333',

  company: {
    name: 'COMPANY',
    website: 'company.com'
  },

  tag: null
};

describe('MAPPING CUSTOMER - USER', () => {
  it('should be mapped value from customer object to user object', (done) => {
    const user = mapping<ICustomer, IUser>({
      from: customer,
      mapper: {
        email: 'email',
        mobile: 'phone',
        tag: 'tag'
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
    expect(user).has.not.ownProperty('tag');
    expect(user.companies).to.be.a('array');
    done();
  });

  it('should be mapped value from customer object to user object. "Tag" should be ""', (done) => {
    const user = mapping<ICustomer, IUser>({
      from: customer,
      mapper: {
        email: 'email',
        mobile: 'phone',
        tag: 'tag'
      },
      option: {
        setValueWhenNull: ''
      },
      handle: (from) => {
        return {
          name: `${from.firstName} ${from.lastName}`,
          companies: [
            mapping<ICustomerCompany, IUserCompany>({
              from: customer.company,
              mapper: {
                name: 'name',
                website: 'website'
              }
            })
          ]
        };
      }
    });

    expect(user.email).to.be.a('string');
    expect(user.mobile).to.be.a('string');
    expect(user.name).to.be.a('string');
    expect(user.tag).is.eqls('');
    expect(user.companies).to.be.a('array');
    done();
  });
});
