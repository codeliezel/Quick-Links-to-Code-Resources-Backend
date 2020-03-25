import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { users } from '../database/models/index';
import index from '../index';
import { signUp, signIn, updateUserDetails } from '../controllers';

const login = {
  email: 'tayoolao224@gmail.com',
  password: 'funmi.5H',
};
const login1 = {
  email: 'toyin@gmail.com',
  password: 'funmi.5H',
};

const updateLogin = {
  email: 'kunle@gmail.com',
  password: 'kunle.5H',
};

const notFoundLogin = {
  email: 'Tolukunle@gmail.com',
  password: 'kunle.5H',
};

chai.use(sinonChai);
const { expect } = chai;

chai.use(chaiHttp);

let request;
describe(' EXAMPLE, GET / POST / PATCH /DELETE', () => {
  it('should handle invalid routes', (done) => {
    chai.request(index)
      .get('/noRoute')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        done();
      });
  });
  it('should get the base route', (done) => {
    chai.request(index)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        done();
      });
  });
});
describe('Test for User Endpoints', () => {
  before(async () => {
    request = chai.request(index).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('TEST user sign up endpoints ', () => {
    it('Should sign up a new user', async () => {
      const account = {
        firstName: 'deleee',
        lastName: 'oladele',
        email: 'deleoladele@gmail.com',
        password: 'deleoladele',
        userName: 'deleola',
        phoneNumber: '090909090909',
      };
      const req = {
        body: account,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(users, 'create').returns(true);

      await signUp(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
    it('should return an error for an already existing email', (done) => {
      chai.request(index)
        .post('/api/v1/user/signup')
        .set('Accept', 'application/json')
        .send({
          firstName: 'deleee',
          lastName: 'oladele',
          email: 'tayoola224@gmail.com',
          password: 'funmi.5H',
          userName: 'deleola4',
          phoneNumber: '090909090909',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          expect(res).to.have.status('409');
          done();
        });
    });
    it('should return an error for an already existing username', (done) => {
      chai.request(index)
        .post('/api/v1/user/signup')
        .set('Accept', 'application/json')
        .send({
          firstName: 'deleee',
          lastName: 'oladele',
          email: 'tayoola2245@gmail.com',
          password: 'funmi.5H',
          userName: 'tayo111',
          phoneNumber: '090909090909',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          expect(res).to.have.status('409');
          done();
        });
    });
    it('should return an error for an already existing phone number', (done) => {
      chai.request(index)
        .post('/api/v1/user/signup')
        .set('Accept', 'application/json')
        .send({
          firstName: 'deleee',
          lastName: 'oladele',
          email: 'tayoola2245@gmail.com',
          password: 'funmi.5H',
          userName: 'tayo1110',
          phoneNumber: '09087678543',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          expect(res).to.have.status('409');
          done();
        });
    });
    it('fake a server error for user sign up', async () => {
      const account = {
        firstName: 'deleee',
      };
      const req = {
        body: account,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(users, 'create').throws();

      await signUp(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should sign in a user', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'tayoola224@gmail.com',
          password: 'funmi.5H',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
    });
    it('an incorrect email', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'tayoola2246@gmail.com',
          password: 'funmi.5H',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res).to.have.status('401');
          done();
        });
    });
    it('an incorrect password', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'tayoola224@gmail.com',
          password: 'funmi.5H6',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res).to.have.status('401');
          done();
        });
    });
  });

  // test for user settings
  describe('TEST USER SETTINGS', () => {
    it('should update user details', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send(updateLogin)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(index)
            .patch('/api/v1/user/settings/f1ba6040-6e94-11ea-b628-e98640756d96')
            .set('Authorization', token)
            .send({
              firstName: 'kunle',
              lastName: 'olakunle',
              password: 'kunle.5H',
              phoneNumber: '077779890987',
              userName: 'kunle10',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return an access denied error when updating user details', (done) => {
      chai.request(index)
        .post('/api/v1/user/signin')
        .set('Accept', 'application/json')
        .send(updateLogin)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(index)
            .patch('/api/v1/user/settings/7a3187b0-6e8a-11ea-987c-7167275b1669')
            .set('Authorization', token)
            .send({
              userName: 'toyin1112',
              firstName: 'Tayo',
              lastName: 'ola',
              phoneNumber: '0960876785439',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(401);
              expect(res).to.have.status('401');
              done();
            });
        });
    });
    it('fake a server error for user user update details', async () => {
      const account = {
        userName: 'toyin1112',
        firstName: 'Tayo',
        lastName: 'ola',
        phoneNumber: '0960876785439',
      };
      const req = {
        body: account,
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(users, 'update').throws();

      await updateUserDetails(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
