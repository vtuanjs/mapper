/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { mapping } = require('../lib');

const customer = {
  firstName: 'Tuan',
  lastName: 'Nguyen',
  email: 'vantuan130393@gmail.com',
  phone: '0333333333',

  company: {
    name: 'COMPANY',
    website: 'company.com'
  }
};

const user = mapping({
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

console.log(user);
