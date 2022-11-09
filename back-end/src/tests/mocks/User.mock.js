const jwt = require('jsonwebtoken');
const { createToken } = require('../../api/security/jwt');

const mockUserCustomer = {
  name: 'jorge',
  email: 'jorge@email.com',
  password: 'jorg&123',
  role: 'customer'
};

const mockUserSeller = {
  name: 'margo',
  email: 'margo@dog.com',
  password: 'm@rd0g089',
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
  token: createToken(mockUserCustomer.email),
};

const mockUserSellerWithToken = {
  ...mockUserSeller,
  token: createToken(mockUserSeller.email),
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
  mockUserCustomerWithId,
  mockUserCustomerWithToken,
  mockUserCustomerWithIdAndToken,
  mockUserSeller,
  mockUserSellerWithId,
  mockUserSellerWithToken,
  mockUserSellerWithIdAndToken,
};
