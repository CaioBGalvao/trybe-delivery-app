const { expect } = require('chai');
const sinon = require('sinon');
const { userService } = require('../../../api/services');
const { User } = require('../../../database/models');
const { 
  mockUserCustomer, 
  mockUserSeller, 
  mockUserCustomerWithId, 
  mockUserSellerWithId, 
  mockUserCustomerWithIdAndToken, 
  mockUserCustomerLogin, 
  mockUserSellerWithIdAndToken, 
  mockUserSellerLogin,
  mockNewUser
} = require('../../mocks/User.mock');

describe('User Service', () => {
  before(() => {
    sinon.stub(User, 'findAll')
      .onCall(0).resolves([mockUserCustomerWithId, mockUserSellerWithId])
      .onCall(1).resolves([mockUserSellerWithId]);

    sinon.stub(User, 'findOne')
      .onCall(0).resolves(mockUserCustomerWithId)
      .onCall(1).resolves(mockUserSellerWithId)
      .onCall(2).resolves(mockUserCustomerWithIdAndToken)
      .onCall(3).resolves(mockUserSellerWithIdAndToken);

    sinon.stub(User, 'findOrCreate')
      .onCall(0).resolves([mockUserCustomerWithId, true])
      .onCall(1).resolves([mockNewUser, true])
      .onCall(2).resolves([mockUserSellerWithId, true])
      .onCall(3).resolves([{}, false]);
  });

  after(() => {
    sinon.restore();
  });

  describe('Find all', () => {
    it('Find all users', async () => {
      const result = await userService.findAll();
      expect(result).to.be.deep.equal([mockUserCustomerWithId, mockUserSellerWithId]);
    });

    it('Find all sellers', async () => {
      const result = await userService.findAllSellers();
      expect(result).to.be.deep.equal([mockUserSellerWithId]);
    });
  });

  describe('Find by id', () => {  
    it('Find customer user', async () => {
      const result = await userService.findById(mockUserCustomerWithId.id);
      expect(result).to.be.deep.equal(mockUserCustomerWithId);
    });
  
    it('Find seller user', async () => {
      const result = await userService.findById(mockUserSellerWithId.id);
      expect(result).to.be.deep.equal(mockUserSellerWithId)
     });
  });

  describe('Login', () => {
    describe('Success', () => {
      it('Login with customer user', async () => {
        const result = await userService.login(mockUserCustomerLogin);
        expect(result).to.be.deep.equal(mockUserCustomerWithIdAndToken);
      });

      it('Login with seller user', async () => {
        const result = await userService.login(mockUserSellerLogin);
        expect(result).to.be.deep.equal(mockUserSellerWithIdAndToken);
      });
    });

    describe('Failure', () => {
      it('Invalid email', async () => {
        let error;

        try {
          await userService.login({email: 'invalid@email.com', password: 'jorg&123'});
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Incorrect email or password&404');
      });

      it('Invalid password', async () => {
        let error;

        try {
          await userService.login({email: 'jorge@email.com', password: 'inv@lid123'});
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Incorrect email or password&404');
      });

      it('Without password', async () => {
        let error;

        try {
          await userService.login({email: 'jorge@email.com'});
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Password is required&400');
      });

      it('Without email', async () => {
        let error;

        try {
          await userService.login({password: 'jorg&123'});
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Email is required&400');
      })
    });
  });

  describe('Create', () => {
    describe('Success', () => {
      it('Create a new customer user', async () => {
        const result = await userService.create(mockUserCustomer);
        expect(result).to.be.equal(true);
      });

      it('Create a new seller user', async () => {
        const result = await userService.create(mockUserSeller);
        expect(result).to.be.equal(true);
      });

      it('Create a new user', async () => {
        const result = await userService.create(mockNewUser);
        expect(result).to.be.equal(true);
      });
    });

    describe('Failure', () => {
      it('Bad request', async () => {
        let error;

        try {
          await userService.create({});
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Name is required&400');
      });

      it('Email already exists in db', async () => {
        let error;

        try {
          await userService.create(mockUserCustomer);
        } catch (err) {
          error = err;
        }

        expect(error.message).to.be.equal('Email already registered&409');
      });
    });    
  });
});
