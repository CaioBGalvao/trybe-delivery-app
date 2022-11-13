const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { createToken } = require('../../api/security/jwt');

const mockUserCustomerLogin = {
  email: 'jorge@email.com',
  password: 'jorg&123',
};

const mockUserSellerLogin = {
  password: 'm@rd0g089',
  email: 'margo@dog.com',
};

const mockNewUser = {
  name: 'teka',
  email: 'teka@dog.com',
  password: 't&ka1111',
};

const mockUserCustomer = {
  ...mockUserCustomerLogin,
  password: md5('jorg&123'),
  name: 'jorge',
  role: 'customer'
};

const mockUserSeller = {
  ...mockUserSellerLogin,
  password: md5('m@rd0g089'),
  name: 'margo',
  role: 'seller',
};

const mockUserCustomerWithId = {
  id: 4,
  ...mockUserCustomer,
};

const mockUserSellerWithId = {
  id: 5,
  ...mockUserSeller,
};

const mockUserCustomerWithToken = {
  ...mockUserCustomer,
  token: createToken({ email: mockUserCustomer.email }),
};

const mockUserSellerWithToken = {
  ...mockUserSeller,
  token: createToken({ email: mockUserSeller.email }),
};

const mockUserCustomerWithIdAndToken = {
  ...mockUserCustomerWithId,
  ...mockUserCustomerWithToken,
};

const mockUserSellerWithIdAndToken = {
  ...mockUserSellerWithId,
  ...mockUserSellerWithToken,
};

module.exports = {
  mockUserCustomer,
  mockUserCustomerLogin,
  mockUserCustomerWithId,
  mockUserCustomerWithToken,
  mockUserCustomerWithIdAndToken,
  mockUserSeller,
  mockUserSellerLogin,
  mockUserSellerWithId,
  mockUserSellerWithToken,
  mockUserSellerWithIdAndToken,
  mockNewUser,
};
