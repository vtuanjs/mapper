## MAPPER
Mapping data from object to another object

### 1. INSTALL
npm install @vtjs/mapper

### 2. HOW TO USE
```
Structure: mapping(from, mapper, handle?, option?)
```

- from: Data source
- mapper: Mapping key by key:
```
"destinationKey": "sourceKey"
```
- handle (optional): Custom function. You need return value of destination object.
- option (optional):
```
setValueWhenNull: "your value",
setValueWhenUndefined: "your value"
```

#### 2.1. Simple with Javascript

```javascript
const { mapping } = require('@vtjs/mapper');

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

// Output
// {
//   email: 'vantuan130393@gmail.com',
//   mobile: '0333333333',
//   name: 'Tuan Nguyen',
//   companies: [ { name: 'COMPANY', website: 'company.com' } ]
// }
```

#### 2.2. Or you need strong "typed" with Typescript
```typescript
import { mapping } from '@vtjs/mapper';

interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  company: {
    name: string;
    website: string;
  };
}

interface IUser {
  name: string;
  email: string;
  mobile: string;

  companies: { name: string; website: string }[];
}

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

// Output
// {
//   email: 'vantuan130393@gmail.com',
//   mobile: '0333333333',
//   name: 'Tuan Nguyen',
//   companies: [ { name: 'COMPANY', website: 'company.com' } ]
// }
```

#### 2.2. You can use multi function "mapping" to handle your function
```typescript
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
```
Thank you for using!